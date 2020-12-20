import { ICommand, ICommandBus } from '../../domain/interfaces';
import { EmailNotifier } from '../../infraestructure/Notifiers/EmailNotifier';
import { CheckForDefaultersHandler } from '../handlers/CheckForDefaultersHandler';
import { CheckForDefaultersCommand } from '../../domain/commands/CheckForDefaultersCommand';
import { LowDbRepository } from '../../infraestructure/Data/LowDbRepository';
import { User } from '../../domain/entities/User.entity';
import { IngestDefaultersCommand } from '../../domain/commands/IngestDefaultersCommand';
import { IngestDefaultersHandler } from '../handlers/IngestDefaultersHandler';

export class CommandBus implements ICommandBus {
  private notifier = new EmailNotifier();
  private repository = new LowDbRepository<User>('users');
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

    throw new Error();
  }
}
