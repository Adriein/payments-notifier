import { IngestDefaultersCommand } from '../../../domain/commands/Defaulters/IngestDefaultersCommand';
import { LANG_ES, USER_ROLE } from '../../../domain/constants';
import { Log } from '../../../domain/Decorators/Log';
import { User } from '../../../domain/entities/User.entity';
import { UserConfig } from '../../../domain/entities/UserConfig.entity';
import { ICommand, IHandler } from '../../../domain/interfaces';
import { IUserRepository } from '../../../domain/interfaces/IUserRepository';
import { Email } from '../../../domain/VO/Email.vo';
import { LastPaymentDate } from '../../../domain/VO/LastPaymentDate.vo';
import { Pricing } from '../../../domain/VO/Pricing.vo';

export class IngestDefaultersHandler implements IHandler<void> {
  constructor(private repository: IUserRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(commands: ICommand): Promise<void> {
    const command = commands as IngestDefaultersCommand;

    const userOnDb = await this.repository.findByEmail(
      new Email(command.email)
    );

    if (userOnDb) {
      const email = new Email(command.email).email;
      const pricing = new Pricing(command.pricing);
      const lastPaymentDate = new LastPaymentDate(command.lastPayment);

      /*If the payment date is the field that changed we don't have to
       mantain the old state otherwise we have to keep the state as it's persisted in the db*/

      const dateUptaded = this.paymentDateUpdated(
        userOnDb.paymentDate(),
        lastPaymentDate.date()
      );

      if (dateUptaded) {
        userOnDb.resetNotificationState();
      }

      const user = new User(
        userOnDb.getId(),
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
        userOnDb.isWarned(),
        userOnDb.isNotified()
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
