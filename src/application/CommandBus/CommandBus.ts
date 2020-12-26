import { ICommand, ICommandBus } from '../../domain/interfaces';
import { EmailNotifier } from '../../infraestructure/Notifiers/EmailNotifier';
import { CheckForDefaultersHandler } from '../Handlers/CheckForDefaultersHandler';
import { CheckForDefaultersCommand } from '../../domain/commands/CheckForDefaultersCommand';
import { LowDbRepository } from '../../infraestructure/Data/Repositories/LowDbRepository';
import { User } from '../../domain/Entities/User.entity';
import { IngestDefaultersCommand } from '../../domain/commands/IngestDefaultersCommand';
import { IngestDefaultersHandler } from '../Handlers/IngestDefaultersHandler';
import { UserMapper } from '../../infraestructure/Data/Mappers/UserMapper';
import { GenerateReportCommand } from '../../domain/commands/GenerateReportCommand';
import { GenerateReportHandler } from '../Handlers/GenerateReportHandler';

export class CommandBus implements ICommandBus {
  private notifier = new EmailNotifier();
  private repository = new LowDbRepository<User>('users', new UserMapper());
  constructor() {}

  public async execute(command: ICommand): Promise<any> {
    return await this.resolveHandler(command).handle(command);
  }

  private resolveHandler(command: ICommand) {
    if (command instanceof CheckForDefaultersCommand) {
      return new CheckForDefaultersHandler(this.notifier, this.repository);
    }

    if (command instanceof IngestDefaultersCommand) {
      return new IngestDefaultersHandler(this.repository);
    }

    if (command instanceof GenerateReportCommand) {
      return new GenerateReportHandler(this.notifier, this.repository);
    }

    throw new Error();
  }
}
