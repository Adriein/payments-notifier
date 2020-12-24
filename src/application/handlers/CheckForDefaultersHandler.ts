import { User } from '../../domain/entities/User.entity';
import { ICommand, IHandler, INotifier } from '../../domain/interfaces';
import { IRepository } from '../../domain/interfaces/IRepository';
import { AboutToExpire } from '../../domain/templates/AboutToExpire.template';
import { Expired } from '../../domain/templates/Expired.template';

export class CheckForDefaultersHandler implements IHandler<void> {
  constructor(
    private notifier: INotifier,
    private repository: IRepository<User>
  ) {}

  public async handle(commands: ICommand): Promise<void> {
    const users = await this.repository.find({});

    for (const user of users) {

      if (user.isTwoDaysBeforeExpiration() && !user.getSentWarning()) {
        const template = new AboutToExpire(user.getName()).generate();

        await this.notifier.notify(user.getEmail(), template);

        user.setSentWarning();

        await this.repository.update(user);

        continue;
      }

      if (!user.isDefaulter() || user.getSentDefaulter()) {
        continue;
      }

      const template = new Expired(user.getName()).generate();

      await this.notifier.notify(user.getEmail(), template);

      user.setSentDefaulter();

      await this.repository.update(user);
    }
  }
}
