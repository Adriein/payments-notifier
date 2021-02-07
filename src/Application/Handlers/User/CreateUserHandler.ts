import { CreateUserCommand } from '../../../Domain/Commands/User/CreateUserCommand';
import { User } from '../../../Domain/Entities/User.entity';
import { UserConfig } from '../../../Domain/Entities/UserConfig.entity';
import { UserAlreadyExistsError } from '../../../Domain/errors/UserAlreadyExistsError';
import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { Email } from '../../../Domain/VO/Email.vo';
import { LastPaymentDate } from '../../../Domain/VO/LastPaymentDate.vo';
import { Pricing } from '../../../Domain/VO/Pricing.vo';
import { LANG_ES, USER_ROLE } from '../../../Domain/constants';

export class CreateUserHandler implements IHandler<void> {
  constructor(
    private userRepository: IUserRepository
  ) {}
  async handle(command: ICommand): Promise<void> {
    const comm = command as CreateUserCommand;

    const email = new Email(comm.email);
    const pricing = new Pricing(comm.pricing);
    const lastPaymentDate = new LastPaymentDate(comm.lastPaymentDate);

    const userOnDb = this.userRepository.findByEmail(email);

    if (userOnDb) {
      throw new UserAlreadyExistsError();
    }

    const config = new UserConfig(LANG_ES, USER_ROLE);

    const user = User.build(comm.username, email, config);

    user.createSubscription(pricing, lastPaymentDate);

    this.userRepository.save(user);
  }
}
