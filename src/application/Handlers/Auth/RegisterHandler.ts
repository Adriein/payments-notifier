import { RegisterCommand } from '../../../domain/commands/Auth/RegisterCommand';
import { LANG_ES, USER_ROLE } from '../../../domain/constants';
import { Log } from '../../../domain/Decorators/Log';
import { User } from '../../../domain/entities/User.entity';
import { UserConfig } from '../../../domain/entities/UserConfig.entity';
import { UserAlreadyExistsError } from '../../../domain/errors/UserAlreadyExistsError';
import { ICommand, IHandler } from '../../../domain/interfaces';
import { IUserRepository } from '../../../domain/interfaces/IUserRepository';
import { Email } from '../../../domain/VO/Email.vo';
import { Password } from '../../../domain/VO/Password.vo';

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
