import { User } from '../../../domain/entities/User.entity';
import { ICommand, IHandler } from '../../../domain/interfaces';
import { IUserRepository } from '../../../domain/interfaces/IUserRepository';
import { Email } from '../../../domain/VO/Email.vo';


export class RegisterHandler implements IHandler<User> {
  constructor(private repository: IUserRepository) {}

  public async handle(comm: ICommand): Promise<User> {
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
