import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { CheckForExpiredSubscriptionsQuery } from "../../Domain/Query/CheckForExpiredSubscriptionsQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";
import { Log } from "../../../../Shared/Domain/Decorators/Log";

@QueryHandler(CheckForExpiredSubscriptionsQuery)
export class CheckForExpiredSubscriptionsHandler implements IHandler<void> {
  constructor(private readonly repository: IUserRepository, private readonly queryBus: IQueryBus<PricingResponse>) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: CheckForExpiredSubscriptionsQuery): Promise<void> {
    const admins = await this.repository.findAdmins();


    for (const admin of admins) {
      const { duration } = await this.queryBus.ask(new GetPricingQuery(admin.id()));

      if (admin.isSubscriptionExpired(duration)) {
        await this.repository.update(admin);
      }

      const users = await this.repository.findUsersWithActiveSubscriptions(admin.id());

      for (const user of users) {
        const { duration } = await this.queryBus.ask(new GetPricingQuery(user.id()));

        if (user.isSubscriptionExpired(duration)) {
          await this.repository.update(user);
        }
      }
    }
  }
}