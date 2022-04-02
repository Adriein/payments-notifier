import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { RenewSubscriptionCommand } from "./RenewSubscriptionCommand";
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { UserFinder } from "../Service/UserFinder";
import { QueryBus } from "../../../../Shared/Infrastructure/Bus/QueryBus";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";

@CommandHandler(RenewSubscriptionCommand)
export class RenewSubscriptionHandler implements IHandler<void> {
  constructor(
    private finder: UserFinder,
    private subscriptionRepository: ISubscriptionRepository,
    private queryBus: QueryBus
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: RenewSubscriptionCommand): Promise<void> {
    const pricingId = new ID(command.pricingId);
    const user = await this.finder.execute(new ID(command.userId));

    const { duration } = await this.queryBus.ask<PricingResponse>(new GetPricingQuery(command.pricingId));

    const subscription = await user.renewSubscription(
      pricingId,
      new DateVo(command.paymentDate),
      duration
    );

    await this.subscriptionRepository.save(subscription);
  }
}