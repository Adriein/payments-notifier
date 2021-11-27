import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { LastPaymentDate } from "../../../../Shared/Domain/VO/LastPaymentDate.vo";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { UserNotExistError } from "../../Domain/UserNotExistError";
import { UpdatePaymentCommand } from "../../Domain/Command/UpdatePaymentCommand";
import { User } from "../../Domain/User.entity";

@CommandHandler(UpdatePaymentCommand)
export class UpdatePaymentHandler implements IHandler<void> {
  constructor(private repository: IUserRepository) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(command: UpdatePaymentCommand): Promise<void> {
    const id = new ID(command.userId);
    const pricingId = new ID(command.pricingId);
    const paymentDate = new LastPaymentDate(command.paymentDate);

    const user = await this.repository.findOne(id.value);

    if (!user) {
      throw new UserNotExistError(id.value);
    }

    await this.renew(user, pricingId, paymentDate);
  }

  private async renew(user: User, pricingId: ID, paymentDate: LastPaymentDate): Promise<void> {
    user.deactivateExpiredSubscription();

    await this.repository.update(user);

    user.renewSubscription(pricingId, paymentDate);

    await this.repository.save(user);
  }
}