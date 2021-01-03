import { EnsureUsersConsistencyCommand } from '../../../domain/commands/Defaulters/EnsureUsersConsistencyCommand';
import { User } from '../../../domain/entities/User.entity';
import { ICommand } from '../../../domain/interfaces';
import { IRepository } from '../../../domain/interfaces/IRepository';

export class EnsureUsersConsistencyHandler {
  constructor(private repository: IRepository<User>) {}

  public async handle(comm: ICommand): Promise<void> {
    const command = comm as EnsureUsersConsistencyCommand;

    const users = await this.repository.find({});

    const emails = command.rows.map((row) => row.email);

    if (users.length > command.rows.length) {
      for (const user of users) {
        if (!emails.includes(user.getEmail())) {
          await this.repository.delete(user.getId());
        }
      }
    }
  }
}
