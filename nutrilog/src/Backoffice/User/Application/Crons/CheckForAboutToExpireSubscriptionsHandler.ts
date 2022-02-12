import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { AppConfigResponse } from "../../../AppConfig/Application/Find/AppConfigResponse";
import { GetAppConfigQuery } from "../../../AppConfig/Domain/Query/GetAppConfigQuery";
import { SendAboutToExpireEmailDomainEvent } from "../../../Notifications/Domain/DomainEvents/SendAboutToExpireEmailDomainEvent";
import { DomainEventsManager } from "../../../../Shared/Domain/Entities/DomainEventsManager";
import { CheckForAboutToExpireSubscriptionsQuery } from "../../Domain/Query/CheckForAboutToExpireSubscriptionsQuery";

@QueryHandler(CheckForAboutToExpireSubscriptionsQuery)
export class CheckForAboutToExpireSubscriptionsHandler implements IHandler<void> {
  constructor(private readonly repository: IUserRepository, private readonly queryBus: IQueryBus<AppConfigResponse>) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: CheckForAboutToExpireSubscriptionsQuery): Promise<void> {
    const result = await this.repository.findAdmins();

    if (result.isLeft()) {
      throw result.value;
    }

    const admins = result.value;

    for (const admin of admins) {
      const usersNotWarned = await this.repository.findUsersNotWarned(admin.id());

      if (usersNotWarned.isLeft()) {
        continue;
      }

      const users = usersNotWarned.value;

      const appConfig = await this.queryBus.ask(new GetAppConfigQuery(admin.id()));

      for (const user of users) {
        const isAboutToExpire = user.subscriptionIsAboutToExpire(appConfig.warningDelay);

        if (!isAboutToExpire) {
          continue;
        }

        user.addEvent(new SendAboutToExpireEmailDomainEvent(user.id()));
        await DomainEventsManager.publishEvents(user.id());

        user.hasBeenWarned();

        await this.repository.update(user);
      }
    }
  }
}