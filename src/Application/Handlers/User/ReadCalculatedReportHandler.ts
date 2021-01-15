import { User } from '../../../Domain/Entities/User.entity';
import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { USER_ROLE } from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';

export class ReadCalculatedReportHandler implements IHandler<User[]> {
  constructor(private finder: UserFinder) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<User[]> {
    const users = (await this.finder.find()) as User[];

    return users.filter(user => user.role() === USER_ROLE);
  }
}
