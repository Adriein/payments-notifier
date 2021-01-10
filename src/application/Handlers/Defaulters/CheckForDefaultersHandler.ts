import { Log } from '../../../domain/Decorators/Log';
import { ICommand, IHandler, INotifier } from '../../../domain/interfaces';
import { IUserRepository } from '../../../domain/interfaces/IUserRepository';
import { AboutToExpire } from '../../../domain/templates/AboutToExpire.template';
import { Expired } from '../../../domain/templates/Expired.template';

export class CheckForDefaultersHandler implements IHandler<void> {
  constructor(
    private notifier: INotifier,
    private repository: IUserRepository
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: ICommand): Promise<void> {
    const users = await this.repository.findAll();

    for (const user of users) {    
      if (
        user.isConfiguredDaysBeforeExpiration() &&
        !user.isWarned() &&
        user.sendWarnings()
      ) {
        const template = new AboutToExpire(user).generate();

        await this.notifier.notify(user.getEmail(), template);

        user.setIsWarned();

        await this.repository.update(user);

        continue;
      }

      if (!user.isDefaulter() || user.isNotified() || !user.sendNotifications()) {
        continue;
      }

      const template = new Expired(user).generate();

      await this.notifier.notify(user.getEmail(), template);

      user.setIsNotified();

      await this.repository.update(user);
    }
  }
}
