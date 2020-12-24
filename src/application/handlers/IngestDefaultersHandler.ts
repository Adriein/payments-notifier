import { IngestDefaultersCommand } from '../../domain/commands/IngestDefaultersCommand';
import { User } from '../../domain/entities/User.entity';
import { ICommand, IHandler } from '../../domain/interfaces';
import { IRepository } from '../../domain/interfaces/IRepository';
import { Email } from '../../domain/VO/Email.vo';
import { LastPaymentDate } from '../../domain/VO/LastPaymentDate.vo';
import { Pricing } from '../../domain/VO/Pricing.vo';
import dayjs from 'dayjs';

export class IngestDefaultersHandler implements IHandler<void> {
  constructor(private repository: IRepository<User>) {}

  public async handle(commands: ICommand): Promise<void> {
    const command = commands as IngestDefaultersCommand;

    const userOnDb = await this.repository.findOne(command.name);

    if (userOnDb) {
      const email = new Email(command.email).email;
      const pricing = new Pricing(command.pricing).pricingType;
      const lastPaymentDate = new LastPaymentDate(command.lastPayment).date;

      const hasSubstantialChanges = this.hasSubstantialChange(
        email,
        pricing,
        lastPaymentDate,
        userOnDb
      );

      if (hasSubstantialChanges) {
        userOnDb.resetNotificationState();
      }

      const user = new User(
        userOnDb.getId(),
        command.name,
        email,
        pricing,
        lastPaymentDate,
        userOnDb.getSentWarning(),
        userOnDb.getSentDefaulter()
      );

      await this.repository.update(user);
      return;
    }

    const user = User.build(
      command.name,
      new Email(command.email),
      new Pricing(command.pricing),
      new LastPaymentDate(command.lastPayment)
    );

    await this.repository.save(user);
  }

  private hasSubstantialChange(
    email: string,
    pricing: string,
    lastPaymentDate: Date,
    user: User
  ): boolean {
    if (
      (email !== user.getEmail() || pricing !== user.getPricing(),
      lastPaymentDate.valueOf() !== user.getPaymentDate().valueOf())
    ) {
      return true;
    }

    return false;
  }
}
