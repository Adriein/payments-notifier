import { User } from '../../../domain/entities/User.entity';
import { ICommand, IHandler } from '../../../domain/interfaces';
import { UserFinder } from '../../../domain/services/UserFinder';

export class ReadCalculatedReportHandler implements IHandler<User[]> {
  constructor(private finder: UserFinder) {}

  public async handle(comm: ICommand): Promise<User[]> {
    return (await this.finder.find()) as User[];
  }
}
