import { ReadUserCommand } from '../../../Domain/Commands/User/ReadUserCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { User } from '../../../Domain/Entities/User.entity';
import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { UserFinder } from '../../../Domain/Services/UserFinder';

export class ReadUserHandler implements IHandler<User> {
  constructor(private finder: UserFinder) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<User> {
    const command = comm as ReadUserCommand;

    return await this.finder.findByEmail(command.email);
  }
}
