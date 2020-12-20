import { IngestDefaultersCommand } from '../../domain/commands/IngestDefaultersCommand';
import { User } from '../../domain/entities/User.entity';
import { ICommand, IHandler } from '../../domain/interfaces';
import { IRepository } from '../../domain/interfaces/IRepository';
import { Email } from '../../domain/VO/Email.vo';
import { LastPaymentDate } from '../../domain/VO/LastPaymentDate.vo';
import { Pricing } from '../../domain/VO/Pricing.vo';

export class IngestDefaultersHandler implements IHandler<void> {
  constructor(private repository: IRepository<any>) {}

  public async handle(commands: ICommand): Promise<void> {
    const command = commands as IngestDefaultersCommand;

    const user = User.build(
      command.name,
      new Email(command.email),
      new Pricing(command.pricing),
      new LastPaymentDate(command.lastPayment)
    );

    const exists: any = await this.repository.findOne(user.getName());

    if (exists) {
      return;
    }

    await this.repository.save({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      pricing: user.getPricing(),
      lastPayment: user.getPaymentDate(),
      notified: false,
      warned: false,
    });
  }
}
