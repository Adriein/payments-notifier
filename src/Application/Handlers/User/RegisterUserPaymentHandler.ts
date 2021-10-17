import { RegisterUserPaymentCommand } from '../../../Domain/Commands/User/RegisterUserPaymentCommand';
import { Log } from '../../../Shared/Domain/Decorators/Log';
import { User } from '../../../Domain/Entities/User.entity';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { Email } from '../../../Shared/Domain/VO/Email.vo';
import { LastPaymentDate } from '../../../Shared/Domain/VO/LastPaymentDate.vo';
import { ICommand } from "../../../Shared/Domain/Interfaces/ICommand";

export class RegisterUserPaymentHandler {
  constructor(
    private finder: UserFinder,
    private userRepository: IUserRepository
  ) {
  }

  @Log(process.env.LOG_LEVEL)
  async handle(command: ICommand): Promise<void> {
    const comm = command as RegisterUserPaymentCommand;

    const emailVo = new Email(comm.email);

    const user = await this.finder.findByEmail(emailVo.value);

    await this.renewSubscription(user);
  }

  private async renewSubscription(user: User): Promise<void> {
    user.desactivateExpiredSubscription();

    await this.userRepository.update(user);

    user.createSubscription(
      user.pricing(),
      new LastPaymentDate(new Date().toString())
    );

    await this.userRepository.insertNewSubscription(user);
  }
}
