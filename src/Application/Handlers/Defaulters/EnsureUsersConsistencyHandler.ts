import { EnsureUsersConsistencyCommand } from '../../../Domain/Commands/Defaulters/EnsureUsersConsistencyCommand';
import { USER_ROLE } from '../../../Domain/constants';
import { Log } from '../../../Shared/Domain/Decorators/Log';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { ICommand } from "../../../Shared/Domain/Interfaces/ICommand";

export class EnsureUsersConsistencyHandler {
  constructor(private repository: IUserRepository, private finder: UserFinder) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<void> {
    const command = comm as EnsureUsersConsistencyCommand;

    const users = await this.finder.find();

    const emails = command.rows.map((row) => row.email);

    if (users.length > command.rows.length) {
      for (const user of users) {
        if (!emails.includes(user.getEmail()) && user.role() === USER_ROLE) {
          await this.repository.delete(user.id());
        }
      }
    }
  }
}
