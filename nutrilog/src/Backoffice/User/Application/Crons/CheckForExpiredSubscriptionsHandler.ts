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
    const result = await this.repository.findAdmins();

    if (result.isLeft()) {
      throw result.value;
    }

    const admins = result.value;

    for (const admin of admins) {
      const { duration } = await this.queryBus.ask(new GetPricingQuery(admin.id()));

      if (admin.isSubscriptionExpired(duration)) {
        await this.repository.update(admin);
      }

      const usersWithActiveSubscriptions = await this.repository.findUsersWithActiveSubscriptions(admin.id());

      if (usersWithActiveSubscriptions.isLeft()) {
        continue;
      }

      const users = usersWithActiveSubscriptions.value;

      for (const user of users) {
        const { duration } = await this.queryBus.ask(new GetPricingQuery(user.id()));

        if (user.isSubscriptionExpired(duration)) {
          await this.repository.update(user);
        }
      }
    }
  }
}