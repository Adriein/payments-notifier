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
import { Pricing } from "../Domain/Pricing.vo";
import { IHandler } from "../../Shared/Domain/Interfaces/IHandler";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements IHandler<void> {
  constructor(private repository: IUserRepository) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(command: CreateUserCommand): Promise<void> {
    const email = new Email(command.email);

    const userExists = await this.repository.findByEmail(email.value);

    const user = User.build(
      new ID(command.adminId),
      command.username,
      Password.generate(),
      email,
      UserConfig.build(),
      Subscription.build(Pricing.build('', 4, 4), new LastPaymentDate(command.lastPaymentDate))
    );

    await this.repository.save(user);
  }
}