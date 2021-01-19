import { RegisterCommand } from '../../../Domain/Commands/Auth/RegisterCommand';
import { LANG_ES, USER_ROLE } from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';
import { User } from '../../../Domain/Entities/User.entity';
import { UserConfig } from '../../../Domain/Entities/UserConfig.entity';
import { UserAlreadyExistsError } from '../../../Domain/errors/UserAlreadyExistsError';
import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { Email } from '../../../Domain/VO/Email.vo';
import { Password } from '../../../Domain/VO/Password.vo';

export class RegisterHandler implements IHandler<void> {
  constructor(private repository: IUserRepository) {}

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
      new UserConfig(LANG_ES, USER_ROLE)
    );

    await user.createPassword(new Password(command.password));

    await this.repository.save(user);
  }
}
