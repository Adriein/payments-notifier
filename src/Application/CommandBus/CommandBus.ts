import { ICommand, ICommandBus } from '../../Domain/Interfaces';
import { EmailNotifier } from '../../Infraestructure/Notifiers/EmailNotifier';
import { CheckForDefaultersHandler } from '../Handlers/Defaulters/CheckForDefaultersHandler';
import { CheckForDefaultersCommand } from '../../Domain/Commands/Defaulters/CheckForDefaultersCommand';
import { IngestDefaultersCommand } from '../../Domain/Commands/Defaulters/IngestDefaultersCommand';
import { IngestDefaultersHandler } from '../Handlers/Defaulters/IngestDefaultersHandler';
import { UserMapper } from '../../Infraestructure/Data/Mappers/UserMapper';
import { GenerateReportCommand } from '../../Domain/Commands/Defaulters/GenerateReportCommand';
import { GenerateReportHandler } from '../Handlers/Defaulters/GenerateReportHandler';
import { EnsureUsersConsistencyCommand } from '../../Domain/Commands/Defaulters/EnsureUsersConsistencyCommand';
import { EnsureUsersConsistencyHandler } from '../Handlers/Defaulters/EnsureUsersConsistencyHandler';
import { RegisterCommand } from '../../Domain/Commands/Auth/RegisterCommand';
import { RegisterHandler } from '../Handlers/Auth/RegisterHandler';
import { SignInCommand } from '../../Domain/Commands/Auth/SignInCommand';
import { SignInHandler } from '../Handlers/Auth/SignInHandler';
import { UserRepository } from '../../Infraestructure/Data/Repositories/UserRepository';
import { ReadUserCommand } from '../../Domain/Commands/User/ReadUserCommand';
import { ReadUserHandler } from '../Handlers/User/ReadUserHandler';
import { UserFinder } from '../../Domain/Services/UserFinder';
import { ReadCalculatedReportCommand } from '../../Domain/Commands/User/ReadCalculatedReportCommand';
import { ReadCalculatedReportHandler } from '../Handlers/User/ReadCalculatedReportHandler';
import { UpdateUserNotificationsCommand } from '../../Domain/Commands/User/UpdateUserNotificationsCommand';
import { UpdateUserNotificationsHandler } from '../Handlers/User/UpdateUserNotificationsHandler';
import { CreateUserCommand } from '../../Domain/Commands/User/CreateUserCommand';
import { CreateUserHandler } from '../Handlers/User/CreateUserHandler';

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

    if (command instanceof UpdateUserNotificationsCommand) {
      return new UpdateUserNotificationsHandler(this.userFinder, this.usersRepository);
    }

    if (command instanceof CreateUserCommand) {
      return new CreateUserHandler(this.userFinder, this.usersRepository);
    }

    throw new Error();
  }
}
