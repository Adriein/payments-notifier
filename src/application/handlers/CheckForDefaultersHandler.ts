import { CheckForDefaultersCommand } from '../../domain/commands/CheckForDefaultersCommand';
import { User } from '../../domain/entities/User.entity';
import { ICommand, IHandler, INotifier } from '../../domain/interfaces';
import { IRepository } from '../../domain/interfaces/IRepository';
import { AboutToExpire } from '../../domain/templates/AboutToExpire.template';
import { Expired } from '../../domain/templates/Expired.template';
import { Email } from '../../domain/VO/Email.vo';
import { LastPaymentDate } from '../../domain/VO/LastPaymentDate.vo';
import { Pricing } from '../../domain/VO/Pricing.vo';

export class CheckForDefaultersHandler implements IHandler<void> {
  constructor(
    private notifier: INotifier,
    private repository: IRepository<User>
  ) {}

  public async handle(commands: ICommand): Promise<void> {
    const command = commands as CheckForDefaultersCommand;

    const user = User.build(
      command.name,
      new Email(command.email),
      new Pricing(command.pricing),
      new LastPaymentDate(command.lastPayment)
    );

    if (!user.isDefaulter()) {
      return;
    }

    if (user.isTwoDaysBeforeExpiration()) {
      const template = new AboutToExpire(user.getName()).generate();

      await this.notifier.notify(user.getEmail(), template);

      user.setSentWarning();

      await this.repository.save(user);

      return;
    }

    const template = new Expired(user.getName()).generate();

    await this.notifier.notify(user.getEmail(), template);

    user.setSentDefaulter();

    await this.repository.save(user);
  }
}
