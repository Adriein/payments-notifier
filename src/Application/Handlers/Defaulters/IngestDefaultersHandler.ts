import { IngestDefaultersCommand } from '../../../Domain/Commands/Defaulters/IngestDefaultersCommand';
import { LANG_ES, USER_ROLE } from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';
import { User } from '../../../Domain/Entities/User.entity';
import { UserConfig } from '../../../Domain/Entities/UserConfig.entity';
import { IHandler } from '../../../Domain/Interfaces';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { Email } from '../../../Domain/VO/Email.vo';
import { ID } from '../../../Domain/VO/Id.vo';
import { LastPaymentDate } from '../../../Domain/VO/LastPaymentDate.vo';
import { Pricing } from '../../../Domain/VO/Pricing.vo';
import { ICommand } from "../../../Shared/Domain/Interfaces/ICommand";

export class IngestDefaultersHandler implements IHandler<void> {
  constructor(private repository: IUserRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(commands: ICommand): Promise<void> {
    const command = commands as IngestDefaultersCommand;

    const userOnDb = await this.repository.findByEmail(
      new Email(command.email)
    );

    if (userOnDb) {
      const email = new Email(command.email).value;
      const pricing = new Pricing(command.pricing);
      const lastPaymentDate = new LastPaymentDate(command.lastPayment);

      /*If the payment date is the field that changed we don't have to
       mantain the old state otherwise we have to keep the state as it's persisted in the db*/

      const dateUptaded = this.paymentDateUpdated(
        userOnDb.paymentDate(),
        lastPaymentDate.value
      );

      if (dateUptaded) {
        userOnDb.resetNotificationState();
      }

      const user = new User(
        new ID(userOnDb.id()),
        command.name,
        new Email(email),
        new UserConfig(
          userOnDb.lang(),
          userOnDb.role(),
          userOnDb.sendNotifications(),
          userOnDb.sendWarnings()
        )
      );

      user.createSubscription(
        pricing,
        lastPaymentDate,
        userOnDb.subscriptionId()!,
        userOnDb.isWarned(),
        userOnDb.isNotified(),
        userOnDb.isSubscriptionActive()
      );

      await this.repository.update(user);
      return;
    }

    const user = User.build(
      command.name,
      new Email(command.email),
      new UserConfig(LANG_ES, USER_ROLE)
    );

    user.createSubscription(
      new Pricing(command.pricing),
      new LastPaymentDate(command.lastPayment)
    );

    await this.repository.save(user);
  }

  private paymentDateUpdated(
    storedPaymentDate: Date,
    providedPaymentDate: Date
  ): boolean {
    if (storedPaymentDate.valueOf() !== providedPaymentDate.valueOf()) {
      return true;
    }

    return false;
  }
}
