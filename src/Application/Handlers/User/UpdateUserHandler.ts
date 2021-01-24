import { UpdateUserCommand } from '../../../Domain/Commands/User/UpdateUserCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { User } from '../../../Domain/Entities/User.entity';
import { UserConfig } from '../../../Domain/Entities/UserConfig.entity';
import { ICommand } from '../../../Domain/Interfaces';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { Email } from '../../../Domain/VO/Email.vo';
import { LastPaymentDate } from '../../../Domain/VO/LastPaymentDate.vo';
import { Pricing } from '../../../Domain/VO/Pricing.vo';

export class UpdateUserHandler {
  constructor(
    private finder: UserFinder,
    private userRepository: IUserRepository
  ) {}

  @Log(process.env.LOG_LEVEL)
  async handle(command: ICommand): Promise<void> {
    const comm = command as UpdateUserCommand;

    const user = (await this.finder.find(undefined, comm.id)) as User;
        
    const updatedUser = new User(
      user.getId(),
      comm.username,
      new Email(comm.email),
      new UserConfig(
        user.lang(),
        user.role(),
        user.sendNotifications(),
        user.sendWarnings(),
        user.configId()
      )
    );

    const pricingVO = new Pricing(comm.pricing);

    if (user.pricing() !== pricingVO.pricingType) {
      updatedUser.setSubscription(
        user.subscriptionId()!,
        pricingVO,
        new LastPaymentDate(user.paymentDate()!.toString()),
        user.isWarned(),
        user.isNotified()
      );
    }

    await this.userRepository.update(updatedUser);
  }
}
