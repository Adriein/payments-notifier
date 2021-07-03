import {
  CLIENT_EMAIL_CONFIG_SUBJECT,
  NOTIFICATIONS_EMAIL,
  OPERATORS,
} from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';
import { Criteria } from '../../../Domain/Entities/Criteria.entity';
import { Filter } from '../../../Domain/Entities/Filter.entity';
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
    const admins = await this.finder.onlyAdmins().find();
    
    const withWarnings = new Filter('send_warnings', 'true', OPERATORS.equal);
    const notNotified = new Filter('warned', 'false', OPERATORS.equal);
    const criteria = new Criteria([withWarnings, notNotified]);

    for (const admin of admins) {
      const users = await this.finder.adminId(admin.id()).find(criteria);

      const config = await this.configRepository.findByAdminId(admin.id());

      for (const user of users) {
        if (!user.isAboutToExpire(config?.warningDelay)) {
          continue;
        }

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

        //const template = new Expired(user).generate();

        //await this.notifier.notify(user.getEmail(), template);

        // user.setIsNotified();

        // await this.repository.update(user);
      }
    }
  }
}
