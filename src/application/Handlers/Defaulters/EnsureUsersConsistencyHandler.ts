import { EnsureUsersConsistencyCommand } from '../../../domain/commands/Defaulters/EnsureUsersConsistencyCommand';
import { USER_ROLE } from '../../../domain/constants';
import { Log } from '../../../domain/Decorators/Log';
import { ICommand } from '../../../domain/interfaces';
import { IUserRepository } from '../../../domain/interfaces/IUserRepository';

export class EnsureUsersConsistencyHandler {
  constructor(private repository: IUserRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<void> {
    const command = comm as EnsureUsersConsistencyCommand;

    const users = await this.repository.findAll();

    const emails = command.rows.map((row) => row.email);

    if (users.length > command.rows.length) {
      for (const user of users) {
        if (!emails.includes(user.getEmail()) && user.role() === USER_ROLE) {
          await this.repository.delete(user.getId());
        }
      }
    }
  }
}
