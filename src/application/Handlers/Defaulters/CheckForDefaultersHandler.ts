import { ICommand, IHandler, INotifier } from '../../../domain/interfaces';
import { AboutToExpire } from '../../../domain/templates/AboutToExpire.template';
import { Expired } from '../../../domain/templates/Expired.template';
import { UserRepository } from '../../../infraestructure/Data/Repositories/UserRepository';

export class CheckForDefaultersHandler implements IHandler<void> {
  constructor(
    private notifier: INotifier,
    private repository: UserRepository
  ) {}

  public async handle(command: ICommand): Promise<void> {
    const users = await this.repository.findAll();

    for (const user of users) {      
      if (user.isTwoDaysBeforeExpiration() && !user.isWarned()) {
        const template = new AboutToExpire(user.getName()).generate();

        await this.notifier.notify(user.getEmail(), template);

        user.setIsWarned();

        await this.repository.update(user);

        continue;
      }

      if (!user.isDefaulter() || user.isNotified()) {
        continue;
      }

      const template = new Expired(user.getName()).generate();

      await this.notifier.notify(user.getEmail(), template);

      user.setIsNotified();

      await this.repository.update(user);
    }
  }
}
