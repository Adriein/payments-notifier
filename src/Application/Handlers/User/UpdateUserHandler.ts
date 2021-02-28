import { UpdateUserCommand } from '../../../Domain/Commands/User/UpdateUserCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { User } from '../../../Domain/Entities/User.entity';
import { UserConfig } from '../../../Domain/Entities/UserConfig.entity';
import { ICommand } from '../../../Domain/Interfaces';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { UserPriceBuilder } from '../../../Domain/Services/UserPriceBuilder';
import { Email } from '../../../Domain/VO/Email.vo';
import { LastPaymentDate } from '../../../Domain/VO/LastPaymentDate.vo';

export class UpdateUserHandler {
  constructor(
    private finder: UserFinder,
    private userRepository: IUserRepository,
    private priceBuilder: UserPriceBuilder
  ) {}

  @Log(process.env.LOG_LEVEL)
  async handle(command: ICommand): Promise<void> {
    const comm = command as UpdateUserCommand;

    const user = (await this.finder.find(undefined, comm.id)) as User;

    const email = new Email(comm.email);
    const pricing = await this.priceBuilder.build(comm.adminId, comm.pricing);
    const lastPaymentDate = new LastPaymentDate(comm.lastPaymentDate);

    const updatedUser = new User(
      user.getId(),
      comm.username,
      email,
      new UserConfig(
        user.lang(),
        user.role(),
        user.sendNotifications(),
        user.sendWarnings(),
        user.configId()
      ),
      comm.adminId
    );

    updatedUser.setSubscription(
      user.subscriptionId()!,
      pricing,
      lastPaymentDate,
      user.isWarned(),
      user.isNotified(),
      user.isSubscriptionActive()
    );

    await this.userRepository.update(updatedUser);
  }
}
