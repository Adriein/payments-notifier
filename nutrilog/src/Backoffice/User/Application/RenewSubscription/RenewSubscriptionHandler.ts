import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { RenewSubscriptionCommand } from "./RenewSubscriptionCommand";
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { UserFinder } from "../Service/UserFinder";

@CommandHandler(RenewSubscriptionCommand)
export class RenewSubscriptionHandler implements IHandler<void> {
  constructor(private finder: UserFinder, private subscriptionRepository: ISubscriptionRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: RenewSubscriptionCommand): Promise<void> {
    const user = await this.finder.execute(new ID(command.userId));

    const subscription = await user.renewSubscription(
      new ID(command.pricingId),
      new DateVo(command.paymentDate),
      command.pricingDuration
    );

    await this.subscriptionRepository.save(subscription);
  }
}