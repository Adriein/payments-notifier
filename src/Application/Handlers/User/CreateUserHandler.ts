import { CreateUserCommand } from '../../../Domain/Commands/User/CreateUserCommand';
import { User } from '../../../Domain/Entities/User.entity';
import { UserConfig } from '../../../Domain/Entities/UserConfig.entity';
import { UserAlreadyExistsError } from '../../../Domain/Errors';
import { IHandler } from '../../../Domain/Interfaces';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { Email } from '../../../Shared/Domain/VO/Email.vo';
import { LastPaymentDate } from '../../../Shared/Domain/VO/LastPaymentDate.vo';
import { LANG_ES, USER_ROLE } from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';
import { PriceBuilder } from '../../../Domain/Services/PriceBuilder';
import { ICommand } from "../../../Shared/Domain/Interfaces/ICommand";

export class CreateUserHandler implements IHandler<void> {
  constructor(
    private userRepository: IUserRepository,
    private priceBuilder: PriceBuilder
  ) {
  }

  @Log(process.env.LOG_LEVEL)
  async handle(command: ICommand): Promise<void> {
    const comm = command as CreateUserCommand;

    const email = new Email(comm.email);
    const pricing = await this.priceBuilder.build(comm.adminId, comm.pricing);
    const lastPaymentDate = new LastPaymentDate(comm.lastPaymentDate);

    const userOnDb = await this.userRepository.findByEmail(email);

    if (userOnDb) {
      throw new UserAlreadyExistsError();
    }

    const config = new UserConfig(LANG_ES, USER_ROLE);

    const user = User.build(comm.username, email, config, comm.adminId);

    user.createSubscription(pricing, lastPaymentDate);

    await this.userRepository.save(user);
  }
}
