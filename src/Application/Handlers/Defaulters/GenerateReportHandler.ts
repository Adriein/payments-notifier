import {
  ADMIN_EMAIL_CONFIG_SUBJECT,
  BACKOFFICE_EMAIL,
  NOTIFICATIONS_EMAIL,
} from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';
import { EmailConfig } from '../../../Domain/Entities/Mail/EmailConfig.entity';
import { IHandler, INotifier } from '../../../Domain/Interfaces';
import { IConfigRepository } from '../../../Domain/Interfaces/IConfigRepository';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { Report, ReportType } from '../../../Domain/Templates/Report.template';

export class GenerateReportHandler implements IHandler<void> {
  constructor(
    private notifier: INotifier,
    private finder: UserFinder,
    private configRepository: IConfigRepository
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(): Promise<void> {
    const adminsOnDb = await this.finder.onlyAdmins().find();

    for (const admin of adminsOnDb) {
      const usersOnDb = await this.finder.adminId(admin.getId()).find();
      let report: ReportType = {
        summary: { defaulters: 0, notifieds: 0, total: usersOnDb.length },
        defaulters: [],
        notifieds: [],
      };

      for (const user of usersOnDb) {
        if (user.isDefaulter() && !user.isOneDayOldDefaulter()) {
          report['summary']['defaulters'] = report['summary']['defaulters'] + 1;
          report['defaulters'] = [...report['defaulters'], user];
          continue;
        }
        if (user.isWarned()) {
          report['summary']['notifieds'] = report['summary']['notifieds'] + 1;
          report['notifieds'] = [...report['notifieds'], user];
        }
      }

      if (report.defaulters.length === 0) {
        return;
      }

      const config = await this.configRepository.findByAdminId(admin.getId());

      const template = await new Report(report, config!).generate();

      const destinatary =
        process.env.NODE_ENV! === 'PRO'
          ? process.env.ADMIN_EMAIL!
          : BACKOFFICE_EMAIL;

      await this.notifier.notify(
        new EmailConfig(
          NOTIFICATIONS_EMAIL,
          destinatary,
          ADMIN_EMAIL_CONFIG_SUBJECT,
          ADMIN_EMAIL_CONFIG_SUBJECT,
          template
        )
      );
    }
  }
}
