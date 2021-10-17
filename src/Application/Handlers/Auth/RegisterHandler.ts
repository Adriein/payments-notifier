import { CreateAppConfigCommand } from '../../../Domain/Commands/AppConfig/CreateAppConfigCommand';
import { RegisterCommand } from '../../../Domain/Commands/Auth/RegisterCommand';
import {
  ADMIN_ROLE,
  DEFAULT_ADMIN_PRICING,
  DEFAULT_DELAY_DAYS,
  DEFAULT_EMAIL_CONTENT,
  DEFAULT_PRICING,
  DEFAULT_WARNING_DAYS,
  LANG_ES,
} from '../../../Domain/constants';
import { Log } from '../../../Shared/Domain/Decorators/Log';
import { User } from '../../../Domain/Entities/User.entity';
import { UserConfig } from '../../../Domain/Entities/UserConfig.entity';
import { UserAlreadyExistsError } from '../../../Domain/Errors';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { Email } from '../../../Shared/Domain/VO/Email.vo';
import { LastPaymentDate } from '../../../Shared/Domain/VO/LastPaymentDate.vo';
import { Password } from '../../../Shared/Domain/VO/Password.vo';
import { Pricing } from '../../../Domain/VO/Pricing.vo';
import { CommandBus } from '../../CommandBus/CommandBus';
import { IHandler } from "../../../Domain/Interfaces";
import { ICommand } from "../../../Shared/Domain/Interfaces/ICommand";

export class RegisterHandler implements IHandler<void> {
  constructor(
    private repository: IUserRepository,
    private commandBus: CommandBus
  ) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<void> {
    const command = comm as RegisterCommand;

    const exists = await this.repository.findByEmail(new Email(command.email));

    if (exists) {
      throw new UserAlreadyExistsError();
    }

    const user = User.build(
      command.username,
      new Email(command.email),
      new UserConfig(LANG_ES, ADMIN_ROLE)
    );

    user.createSubscription(
      new Pricing(DEFAULT_ADMIN_PRICING),
      new LastPaymentDate(new Date().toString())
    );

    await user.createPassword(new Password(command.password));

    await this.repository.save(user);

    //Once the admin is registered we create a default app config
    await this.commandBus.execute(
      new CreateAppConfigCommand(
        DEFAULT_PRICING,
        DEFAULT_WARNING_DAYS,
        DEFAULT_DELAY_DAYS,
        DEFAULT_EMAIL_CONTENT,
        user.id()
      )
    );
  }
}
