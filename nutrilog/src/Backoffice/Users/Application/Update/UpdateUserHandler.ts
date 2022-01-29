import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { UserConfig } from "../../Domain/Entity/UserConfig.entity";
import { User } from "../../Domain/Entity/User.entity";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";
import { Password } from "../../../../Shared/Domain/VO/Password.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { UpdateUserCommand } from "../../Domain/Command/UpdateUserCommand";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements IHandler<void> {
  constructor(private repository: IUserRepository, private readonly queryBus: IQueryBus<PricingResponse>) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: UpdateUserCommand): Promise<void> {
    const id = new ID(command.id);
    const email = new Email(command.email);

    const result = await this.repository.findOne(id.value);

    if (result.isLeft()) {
      throw result.value;
    }

    const userOnDb = result.value;

    const pricingId = new ID(command.pricingId);
    const { duration } = await this.queryBus.ask(new GetPricingQuery(command.pricingId));

    const validTo = userOnDb.subscriptionExpirationDate(duration);

    const config = new UserConfig(
      new ID(userOnDb.configId()),
      userOnDb.language(),
      userOnDb.sendNotifications(),
      userOnDb.sendWarnings()
    );

    const subscription = new Subscription(
      new ID(userOnDb.subscriptionId()),
      pricingId,
      new DateVo(command.lastPaymentDate),
      validTo,
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