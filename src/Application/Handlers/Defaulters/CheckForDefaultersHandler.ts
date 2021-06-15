import {
  CLIENT_EMAIL_CONFIG_SUBJECT,
  NOTIFICATIONS_EMAIL,
} from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';
import { EmailConfig } from '../../../Domain/Entities/Mail/EmailConfig.entity';
import { ICommand, IHandler, INotifier } from '../../../Domain/Interfaces';
import { IConfigRepository } from '../../../Domain/Interfaces/IConfigRepository';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { AboutToExpire } from '../../../Domain/Templates/AboutToExpire.template';

export class CheckForDefaultersHandler implements IHandler<void> {
  constructor(
    private notifier: INotifier,
    private repository: IUserRepository,
    private configRepository: IConfigRepository,
    private finder: UserFinder
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: ICommand): Promise<void> {
    const users = await this.finder.find();

    for (const user of users) {
      const config = await this.configRepository.findByAdminId(user.ownerId!);

      if (
        user.isConfiguredDaysBeforeExpiration(config?.warningDelay) &&
        !user.isWarned() &&
        user.sendWarnings()
      ) {
        const template = await new AboutToExpire(user, config!).generate();

        await this.notifier.notify(
          new EmailConfig(
            NOTIFICATIONS_EMAIL,
            user.getEmail(),
            CLIENT_EMAIL_CONFIG_SUBJECT,
            CLIENT_EMAIL_CONFIG_SUBJECT,
            template
          )
        );

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

      //const template = new Expired(user).generate();

      //await this.notifier.notify(user.getEmail(), template);

      user.setIsNotified();

      await this.repository.update(user);
    }
  }
}
