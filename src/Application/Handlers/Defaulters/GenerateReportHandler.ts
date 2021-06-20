import {
  ADMIN_EMAIL_CONFIG_SUBJECT,
  BACKOFFICE_EMAIL,
  NOTIFICATIONS_EMAIL,
  REPORT_DYNAMIC_TEMPLATE,
} from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';
import { AppConfig } from '../../../Domain/Entities/AppConfig.entity';
import { EmailStats } from '../../../Domain/Entities/Mail/EmailStats.entity';
import { TemplateEmailConfig } from '../../../Domain/Entities/Mail/TemplateEmailConfig';
import { User } from '../../../Domain/Entities/User.entity';
import { IHandler, INotifier } from '../../../Domain/Interfaces';
import { IConfigRepository } from '../../../Domain/Interfaces/IConfigRepository';
import { IEmailApi } from '../../../Domain/Interfaces/IEmailApi';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { Report } from '../../../Domain/Templates/Report.template';
import { debug } from '../../../Infraestructure/Helpers/Debug.utils';
import { Time } from '../../../Infraestructure/Helpers/Time.utils';

// type Summary = {
//   totalDefaulters: number;
//   newDefaulters: number;
//   lastReportDate: string;
//   reportDate: string;
//   totalWarningEmailsSent: number;
//   totalEmailsRead: number;
// };

// type Report = {
//   defaulters: string[];
//   oldDefaulters: string[];
//   summary: Summary;
// };

export class GenerateReportHandler implements IHandler<void> {
  constructor(
    private notifier: INotifier,
    private finder: UserFinder,
    private configRepository: IConfigRepository,
    private api: IEmailApi
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(): Promise<void> {
    const admins = await this.finder.onlyAdmins().find();

    const key = process.env.SEND_GRID_API_KEY!; //await this.apiKeyRepository.getSendGridApiKey();

    for (const admin of admins) {
      const users = await this.finder.adminId(admin.getId()).find();

      const config = await this.configRepository.findByAdminId(admin.getId());

      const stats = await this.getEmailStats(key, config!);

      const lastReportDate = Time.format(
        config!.lastSentReport!,
        Time.EUROPEAN_DATE_FORMAT
      );
      const report = users.reduce((template: Report, user: User) => {
        return this.buildReport(user, template);
      }, new Report(lastReportDate));

      stats.forEach((stat: EmailStats) =>
        this.fillReportWithStats(stat, report)
      );

      debug(report);
      if (report.defaulters().length === 0) {
        return;
      }

      const destinatary =
        process.env.NODE_ENV! === 'PRO'
          ? process.env.ADMIN_EMAIL!
          : BACKOFFICE_EMAIL;

      await this.notifier.notify(
        new TemplateEmailConfig(
          NOTIFICATIONS_EMAIL,
          destinatary,
          REPORT_DYNAMIC_TEMPLATE,
          report
        )
      );
    }
  }

  private async getEmailStats(
    key: string,
    config: AppConfig
  ): Promise<EmailStats[]> {
    return await this.api
      .setKey(key)
      .getEmailStats(
        Time.format(config.lastSentReport!, Time.SEND_GRID_DATE_FORMAT),
        Time.format(new Date(), Time.SEND_GRID_DATE_FORMAT)
      );
  }

  private buildReport(user: User, report: Report): Report {
    if (user.isDefaulter() && user.isOneDayOldDefaulter()) {
      report.incrementTotalDefaulters();
      report.addOldDefaulter(user.getName());
    }
    if (user.isDefaulter() && !user.isOneDayOldDefaulter()) {
      report.addDefaulter(user.getName());
    }

    return report;
  }

  private fillReportWithStats(stat: EmailStats, report: Report) {
    if (stat.opened != 0) {
      report.incrementTotalEmailsOpened(stat.opened);
    }
    debug(stat.sent);
    if (stat.sent != 0) {
      report.incrementTotalEmailsSent(stat.sent);
    }
  }
}
