import { RegisterUserPaymentCommand } from '../../../Domain/Commands/User/RegisterUserPaymentCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { User } from '../../../Domain/Entities/User.entity';
import { ICommand } from '../../../Domain/Interfaces';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { Email } from '../../../Domain/VO/Email.vo';

export class RegisterUserPaymentHandler {
  constructor(
    private finder: UserFinder,
    private userRepository: IUserRepository
  ) {}

  @Log(process.env.LOG_LEVEL)
  async handle(command: ICommand): Promise<void> {
    const comm = command as RegisterUserPaymentCommand;

    const emailVo = new Email(comm.email);

    const user = (await this.finder.find(emailVo.email)) as User;

    user.renewSubscription();

    await this.userRepository.update(user);
  }
}
