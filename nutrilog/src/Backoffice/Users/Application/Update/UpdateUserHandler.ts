import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { UserConfig } from "../../Domain/UserConfig.entity";
import { User } from "../../Domain/User.entity";
import { Subscription } from "../../Domain/Subscription.entity";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { LastPaymentDate } from "../../../../Shared/Domain/VO/LastPaymentDate.vo";
import { Password } from "../../../../Shared/Domain/VO/Password.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { UpdateUserCommand } from "../../Domain/Command/UpdateUserCommand";
import { UserNotExistError } from "../../Domain/UserNotExistError";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements IHandler<void> {
  constructor(private repository: IUserRepository) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(command: UpdateUserCommand): Promise<void> {
    const id = new ID(command.id);
    const email = new Email(command.email);

    const userOnDb = await this.repository.findOne(id.value);

    if (!userOnDb) {
      throw new UserNotExistError(email.value)
    }

    const config = new UserConfig(
      new ID(userOnDb.configId()),
      userOnDb.language(),
      userOnDb.sendNotifications(),
      userOnDb.sendWarnings()
    );

    const subscription = new Subscription(
      new ID(userOnDb.subscriptionId()),
      new ID(command.pricingId),
      new LastPaymentDate(command.lastPaymentDate),
      userOnDb.isWarned(),
      userOnDb.isNotified(),
      userOnDb.isSubscriptionActive(),
      userOnDb.isSubscriptionExpired(),
      userOnDb.subscriptionCreatedAt(),
      new Date()
    );

    const user = new User(
      new ID(command.id),
      command.username,
      new Password(userOnDb.password()),
      email,
      config,
      new ID(command.adminId),
      new ID(userOnDb.roleId()),
      subscription,
      userOnDb.isActive(),
      undefined,
      userOnDb.createdAt(),
      new Date(),
    )

    await this.repository.update(user);
  }
}