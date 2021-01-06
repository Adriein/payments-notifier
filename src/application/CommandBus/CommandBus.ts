import { ICommand, ICommandBus } from '../../domain/interfaces';
import { EmailNotifier } from '../../infraestructure/Notifiers/EmailNotifier';
import { CheckForDefaultersHandler } from '../Handlers/Defaulters/CheckForDefaultersHandler';
import { CheckForDefaultersCommand } from '../../domain/commands/Defaulters/CheckForDefaultersCommand';
import { IngestDefaultersCommand } from '../../domain/commands/Defaulters/IngestDefaultersCommand';
import { IngestDefaultersHandler } from '../Handlers/Defaulters/IngestDefaultersHandler';
import { UserMapper } from '../../infraestructure/Data/Mappers/UserMapper';
import { GenerateReportCommand } from '../../domain/commands/Defaulters/GenerateReportCommand';
import { GenerateReportHandler } from '../Handlers/Defaulters/GenerateReportHandler';
import { EnsureUsersConsistencyCommand } from '../../domain/commands/Defaulters/EnsureUsersConsistencyCommand';
import { EnsureUsersConsistencyHandler } from '../Handlers/Defaulters/EnsureUsersConsistencyHandler';
import { RegisterCommand } from '../../domain/commands/Auth/RegisterCommand';
import { RegisterHandler } from '../Handlers/Auth/RegisterHandler';
import { SignInCommand } from '../../domain/commands/Auth/SignInCommand';
import { SignInHandler } from '../Handlers/Auth/SignInHandler';
import { UserRepository } from '../../infraestructure/Data/Repositories/UserRepository';
import { ReadUserCommand } from '../../domain/commands/User/ReadUserCommand';
import { ReadUserHandler } from '../Handlers/User/ReadUserHandler';
import { UserFinder } from '../../domain/services/UserFinder';
import { ReadCalculatedReportCommand } from '../../domain/commands/User/ReadCalculatedReportCommand';
import { ReadCalculatedReportHandler } from '../Handlers/User/ReadCalculatedReportHandler';

export class CommandBus implements ICommandBus {
  private notifier = new EmailNotifier();
  private usersRepository = new UserRepository('users', new UserMapper());
  private userFinder = new UserFinder(this.usersRepository);
  constructor() {}

  public async execute(command: ICommand): Promise<any> {
    return await this.resolveHandler(command).handle(command);
  }

  private resolveHandler(command: ICommand) {
    if (command instanceof CheckForDefaultersCommand) {
      return new CheckForDefaultersHandler(this.notifier, this.usersRepository);
    }

    if (command instanceof IngestDefaultersCommand) {
      return new IngestDefaultersHandler(this.usersRepository);
    }

    if (command instanceof GenerateReportCommand) {
      return new GenerateReportHandler(this.notifier, this.usersRepository);
    }

    if (command instanceof EnsureUsersConsistencyCommand) {
      return new EnsureUsersConsistencyHandler(this.usersRepository);
    }

    if (command instanceof RegisterCommand) {
      return new RegisterHandler(this.usersRepository);
    }

    if (command instanceof SignInCommand) {
      return new SignInHandler(this.userFinder);
    }

    if (command instanceof ReadUserCommand) {
      return new ReadUserHandler(this.userFinder);
    }

    if (command instanceof ReadCalculatedReportCommand) {
      return new ReadCalculatedReportHandler(this.userFinder);
    }

    throw new Error();
  }
}
