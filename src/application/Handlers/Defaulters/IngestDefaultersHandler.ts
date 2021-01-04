import { IngestDefaultersCommand } from '../../../domain/commands/Defaulters/IngestDefaultersCommand';
import { Log } from '../../../domain/Decorators/Log';
import { User } from '../../../domain/entities/User.entity';
import { ICommand, IHandler } from '../../../domain/interfaces';
import { Email } from '../../../domain/VO/Email.vo';
import { LastPaymentDate } from '../../../domain/VO/LastPaymentDate.vo';
import { Pricing } from '../../../domain/VO/Pricing.vo';
import { UserRepository } from '../../../infraestructure/Data/Repositories/UserRepository';

export class IngestDefaultersHandler implements IHandler<void> {
  constructor(private repository: UserRepository) {}

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
        userOnDb.getPaymentDate(),
        lastPaymentDate.date
        
      );

      if (dateUptaded) {
        userOnDb.resetNotificationState();
      }

      const user = new User(userOnDb.getId(), command.name, new Email(email));

      user.createSubscription(
        pricing,
        lastPaymentDate,
        userOnDb.getIsWarned(),
        userOnDb.getIsNotified()
      );

      await this.repository.update(user);
      return;
    }

    const user = User.build(command.name, new Email(command.email));

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
