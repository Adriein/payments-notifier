import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { UpdatePaymentCommand } from "../../Domain/Command/UpdatePaymentCommand";
import { User } from "../../Domain/Entity/User.entity";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";

@CommandHandler(UpdatePaymentCommand)
export class UpdatePaymentHandler implements IHandler<void> {
  constructor(private repository: IUserRepository, private queryBus: IQueryBus<PricingResponse>) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(command: UpdatePaymentCommand): Promise<void> {
    const id = new ID(command.userId);
    const pricingId = new ID(command.pricingId);
    const paymentDate = new DateVo(command.paymentDate);

    const user = await this.getUser(id);

    const oldSubscription = getOldSubscription();

    const extradays = oldSubscription.hasLeftDays();

    const subscription = await user.renewSubscription(pricingId, paymentDAte, extraDays)
    ç


    subscriptionRepo.save(subscription);

    await this.renew(user, pricingId, paymentDate);
  }

  private async renew(user: User, pricingId: ID, paymentDate: DateVo): Promise<void> {
    user.deactivateExpiredSubscription();

    await this.repository.update(user);

    const { duration } = await this.queryBus.ask(new GetPricingQuery(pricingId.value));

    const validTo = user.subscriptionExpirationDate(duration);

    user.renewSubscription(pricingId, paymentDate, validTo);

    await this.repository.save(user);
  }

  private async getUser(id: ID): Promise<User> {
    const result = await this.repository.findOne(id.value);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }
}