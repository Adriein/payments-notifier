import { RegisterCommand } from '../../../domain/commands/Auth/RegisterCommand';
import { User } from '../../../domain/entities/User.entity';
import { UserAlreadyExistsError } from '../../../domain/errors/UserAlreadyExistsError';
import { ICommand, IHandler } from '../../../domain/interfaces';
import { IUserRepository } from '../../../domain/interfaces/IUserRepository';
import { Email } from '../../../domain/VO/Email.vo';


export class RegisterHandler implements IHandler<void> {
  constructor(private repository: IUserRepository) {}

  public async handle(comm: ICommand): Promise<void> {
    const command = comm as RegisterCommand;

    const exists = this.repository.findByName(command.username);

    if (exists) {
      throw new UserAlreadyExistsError();
    }

    const user = User.build(command.username, new Email(command.email));

    await user.setPassword(command.password);

    this.repository.save(user);
  }
}
