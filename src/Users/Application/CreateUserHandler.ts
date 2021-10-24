import { Log } from "../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../Shared/Domain/Decorators/CommandHandler.decorator";
import { CreateUserCommand } from "../Domain/Command/CreateUserCommand";
import { IUserRepository } from "../Domain/IUserRepository";
import { UserConfig } from "../Domain/UserConfig.entity";
import { User } from "../Domain/User.entity";
import { Subscription } from "../Domain/Subscription.entity";
import { ID } from "../../Shared/Domain/VO/Id.vo";
import { LastPaymentDate } from "../../Shared/Domain/VO/LastPaymentDate.vo";
import { Password } from "../../Shared/Domain/VO/Password.vo";
import { Email } from "../../Shared/Domain/VO/Email.vo";
import { IHandler } from "../../Shared/Domain/Interfaces/IHandler";
import { UserAlreadyExistsError } from "../Domain/UserAlreadyExistsError";
import { IQueryBus } from "../../Shared/Domain/Bus/IQueryBus";
import { PricingResponseDto } from "../../Pricing/Application/PricingResponse.dto";
import { GetPricingQuery } from "../../Pricing/Domain/GetPricingQuery";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements IHandler<void> {
  constructor(private repository: IUserRepository, private bus: IQueryBus<PricingResponseDto>) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(command: CreateUserCommand): Promise<void> {
    const email = new Email(command.email);

    const userExists = await this.repository.findByEmail(email.value);

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    const pricing = await this.bus.ask(new GetPricingQuery(command.pricingId));

    const user = User.build(
      new ID(command.adminId),
      command.username,
      Password.generate(),
      email,
      UserConfig.build(),
      Subscription.build(new ID(pricing.id), new LastPaymentDate(command.lastPaymentDate))
    );

    await this.repository.save(user);
  }
}