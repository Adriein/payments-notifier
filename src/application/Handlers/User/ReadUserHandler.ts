import { ReadUserCommand } from '../../../Domain/Commands/User/ReadUserCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { User } from '../../../Domain/entities/User.entity';
import { ICommand, IHandler } from '../../../Domain/interfaces';
import { UserFinder } from '../../../Domain/services/UserFinder';

export class ReadUserHandler implements IHandler<User> {
  constructor(private finder: UserFinder) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<User> {
    const command = comm as ReadUserCommand;

    return (await this.finder.find(command.email)) as User;
  }
}
