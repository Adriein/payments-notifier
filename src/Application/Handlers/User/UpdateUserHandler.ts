import { UpdateUserCommand } from '../../../Domain/Commands/User/UpdateUserCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { User } from '../../../Domain/Entities/User.entity';
import { UserConfig } from '../../../Domain/Entities/UserConfig.entity';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { PriceBuilder } from '../../../Domain/Services/PriceBuilder';
import { Email } from '../../../Domain/VO/Email.vo';
import { LastPaymentDate } from '../../../Domain/VO/LastPaymentDate.vo';
import { ID } from '../../../Domain/VO/Id.vo';
import { ICommand } from "../../../Shared/Domain/Interfaces/ICommand";

export class UpdateUserHandler {
  constructor(
    private finder: UserFinder,
    private userRepository: IUserRepository,
    private priceBuilder: PriceBuilder
  ) {}

  @Log(process.env.LOG_LEVEL)
  async handle(command: ICommand): Promise<void> {
    const comm = command as UpdateUserCommand;

    const user = await this.finder.findById(comm.id);

    const id = new ID(user.id());
    const email = new Email(comm.email);
    const pricing = await this.priceBuilder.build(comm.adminId, comm.pricing);
    const lastPaymentDate = new LastPaymentDate(comm.lastPaymentDate);

    const updatedUser = new User(
      id,
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

    updatedUser.createSubscription(
      pricing,
      lastPaymentDate,
      user.subscriptionId()!,
      user.isWarned(),
      user.isNotified(),
      user.isSubscriptionActive()
    );

    await this.userRepository.update(updatedUser);
  }
}
