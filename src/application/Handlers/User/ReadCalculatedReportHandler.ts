import { User } from '../../../domain/entities/User.entity';
import { ICommand, IHandler } from '../../../domain/interfaces';
import { UserFinder } from '../../../domain/services/UserFinder';
import { USER_ROLE } from '../../../domain/constants';
import { Log } from '../../../domain/Decorators/Log';

export class ReadCalculatedReportHandler implements IHandler<User[]> {
  constructor(private finder: UserFinder) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<User[]> {
    const users = (await this.finder.find()) as User[];

    return users.filter(user => user.role() === USER_ROLE);
  }
}
