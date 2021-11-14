import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { CheckForExpiredSubscriptionsQuery } from "../Domain/Query/CheckForExpiredSubscriptionsQuery";
import { IUserRepository } from "../Domain/IUserRepository";
import { Log } from "../../../Shared/Domain/Decorators/Log";
import { IQueryBus } from "../../../Shared/Domain/Bus/IQueryBus";
import { GetAppConfigDto } from "../../AppConfig/Application/GetAppConfigDto";
import { GetAppConfigQuery } from "../../AppConfig/Domain/GetAppConfigQuery";

@QueryHandler(CheckForExpiredSubscriptionsQuery)
export class CheckForExpiredSubscriptionsHandler implements IHandler<void> {
  constructor(private readonly repository: IUserRepository, private readonly queryBus: IQueryBus<GetAppConfigDto>) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: CheckForExpiredSubscriptionsQuery): Promise<void> {
    const admins = await this.repository.findAdmins();

    for (const admin of admins) {
      const users = await this.repository.findUsersNotWarned(admin.id());
      const appConfig = await this.queryBus.ask(new GetAppConfigQuery(admin.id()));

      for (const user of users) {
        const isAboutToExpire = user.subscriptionIsAboutToExpire(appConfig.warningDelay);

        if (!isAboutToExpire) {
          continue;
        }


      }
    }
  }
}