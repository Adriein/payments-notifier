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
import { AdminFinder } from "../Service/AdminFinder";
import { User } from "../../Domain/Entity/User.entity";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { UserFilter } from "../../Domain/UserFilter";

@QueryHandler(CheckForAboutToExpireSubscriptionsQuery)
export class CheckForAboutToExpireSubscriptionsHandler implements IHandler<void> {
  constructor(
    private readonly repository: IUserRepository,
    private readonly finder: AdminFinder,
    private readonly queryBus: IQueryBus
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: CheckForAboutToExpireSubscriptionsQuery): Promise<void> {
    const adminList = await this.findNutriLogAdminList();

    for (const admin of adminList) {
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

  private findNotWarnedUserList(adminId: ID): Promise<User[]> {
    const criteria = new Criteria<UserFilter>();
  }

  private async findNutriLogAdminList(): Promise<User[]> {
    return await this.finder.execute();
  }
}