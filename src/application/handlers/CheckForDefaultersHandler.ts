import { User } from '../../domain/Entities/User.entity';
import { ICommand, IHandler, INotifier } from '../../domain/Interfaces';
import { IRepository } from '../../domain/Interfaces/IRepository';
import { AboutToExpire } from '../../domain/Templates/AboutToExpire.template';
import { Expired } from '../../domain/Templates/Expired.template';

export class CheckForDefaultersHandler implements IHandler<void> {
  constructor(
    private notifier: INotifier,
    private repository: IRepository<User>
  ) {}

  public async handle(commands: ICommand): Promise<void> {
    const users = await this.repository.find({});

    for (const user of users) {

      if (user.isTwoDaysBeforeExpiration() && !user.getIsWarned()) {
        const template = new AboutToExpire(user.getName()).generate();

        await this.notifier.notify(user.getEmail(), template);

        user.setIsWarned();

        await this.repository.update(user);

        continue;
      }

      if (!user.isDefaulter() || user.getIsNotified()) {
        continue;
      }

      const template = new Expired(user.getName()).generate();

      await this.notifier.notify(user.getEmail(), template);

      user.setIsNotified();

      await this.repository.update(user);
    }
  }
}
