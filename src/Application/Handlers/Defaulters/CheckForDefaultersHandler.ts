import { Log } from '../../../Domain/Decorators/Log';
import { ICommand, IHandler, INotifier } from '../../../Domain/Interfaces';
import { IConfigRepository } from '../../../Domain/Interfaces/IConfigRepository';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { AboutToExpire } from '../../../Domain/Templates/AboutToExpire.template';
import { Expired } from '../../../Domain/Templates/Expired.template';

export class CheckForDefaultersHandler implements IHandler<void> {
  constructor(
    private notifier: INotifier,
    private repository: IUserRepository,
    private configRepository: IConfigRepository
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: ICommand): Promise<void> {
    const users = await this.repository.findAll();

    for (const user of users) {
      const config = await this.configRepository.findByAdminId(user.ownerId!);

      if (
        user.isConfiguredDaysBeforeExpiration(config?.warningDelay) &&
        !user.isWarned() &&
        user.sendWarnings()
      ) {
        const template = new AboutToExpire(user).generate();

        await this.notifier.notify(user.getEmail(), template);

        user.setIsWarned();

        await this.repository.update(user);

        continue;
      }

      if (
        !user.isDefaulter() ||
        user.isNotified() ||
        !user.sendNotifications()
      ) {
        continue;
      }

      const template = new Expired(user).generate();

      await this.notifier.notify(user.getEmail(), template);

      user.setIsNotified();

      await this.repository.update(user);
    }
  }
}
