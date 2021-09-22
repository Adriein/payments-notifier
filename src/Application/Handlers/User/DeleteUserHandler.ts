import { DeleteUserCommand } from '../../../Domain/Commands/User/DeleteUserCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { Email } from '../../../Domain/VO/Email.vo';
import { ICommand } from "../../../Shared/Domain/Interfaces/ICommand";

export class DeleteUserHandler {
  constructor(
    private finder: UserFinder,
    private userRepository: IUserRepository
  ) {}

  @Log(process.env.LOG_LEVEL)
  async handle(command: ICommand): Promise<void> {
    const comm = command as DeleteUserCommand;
    
    const emailVo = new Email(comm.email);

    const user = await this.finder.findByEmail(emailVo.value);

    await this.userRepository.delete(user.id());
  }
}
