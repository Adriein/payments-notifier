import { ReadUserCommand } from '../../../domain/commands/User/ReadUserCommand';
import { Log } from '../../../domain/Decorators/Log';
import { User } from '../../../domain/entities/User.entity';
import { ICommand, IHandler } from '../../../domain/interfaces';
import { UserFinder } from '../../../domain/services/UserFinder';

export class ReadUserHandler implements IHandler<User> {
  constructor(private finder: UserFinder) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<User> {
    const command = comm as ReadUserCommand;

    return (await this.finder.find(command.email)) as User;
  }
}
