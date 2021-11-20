import {
  BACKOFFICE_EMAIL,
  NOTIFICATIONS_EMAIL,
  REPORT_DYNAMIC_TEMPLATE,
} from '../../../Domain/constants';
import { Log } from '../../../Shared/Domain/Decorators/Log';
import { AppConfig } from '../../../Domain/Entities/AppConfig.entity';
import { EmailStats } from '../../../Domain/Entities/Mail/EmailStats.entity';
import { TemplateEmailConfig } from '../../../Domain/Entities/Mail/TemplateEmailConfig';
import { User } from '../../../Domain/Entities/User.entity';
import { IHandler, INotifier } from '../../../Domain/Interfaces';
import { IConfigRepository } from '../../../Domain/Interfaces/IConfigRepository';
import { IEmailApi } from '../../../Domain/Interfaces/IEmailApi';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { Report } from '../../../Backoffice/Notifications/Domain/Report.template';
import { Time } from '../../../Infraestructure/Helpers/Time.utils';

export class GenerateReportHandler implements IHandler<void> {
  constructor(
    private notifier: INotifier,
    private finder: UserFinder,
    private configRepository: IConfigRepository,
    private api: IEmailApi
  ) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(): Promise<void> {
    const admins = await this.finder.onlyAdmins().find();

    const key = process.env.SEND_GRID_API_KEY!; //await this.apiKeyRepository.getSendGridApiKey();

    for (const admin of admins) {
      const users = await this.finder.adminId(admin.id()).find();

      const config = await this.configRepository.findByAdminId(admin.id());

      const stats = await this.getEmailStats(key, config!);

      const lastReportDate = Time.format(
        config!.lastSentReport!,
        Time.EUROPEAN_DATE_FORMAT
      );

      const report = this.generateReport(users, lastReportDate, stats);

      if (report.defaulters().length === 0) {
        continue;
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
          this.mapDomainReportToSendGridReport(report)
        )
      );

      this.configRepository.updateLastReportDate(config!.id);
    }
  }

  private generateReport(
    users: User[],
    lastReportDate: string,
    stats: EmailStats[]
  ) {
    const report = users.reduce((template: Report, user: User) => {
      return this.buildReport(user, template);
    }, new Report(lastReportDate));

    stats.forEach((stat: EmailStats) => this.fillReportWithStats(stat, report));

    return report;
  }

  private async getEmailStats(
    key: string,
    config: AppConfig
  ): Promise<EmailStats[]> {
    return await this.api
      .setKey(key)
      .getEmailStats(
        Time.format(config.lastSentReport!, Time.AMERICAN_DATE_FORMAT),
        Time.format(new Date(), Time.AMERICAN_DATE_FORMAT)
      );
  }

  private buildReport(user: User, report: Report): Report {
    if (user.isDefaulter() && user.isOneDayOldDefaulter()) {
      report.incrementTotalDefaulters();
      report.addOldDefaulter({ name: user.getName(), email: user.getEmail() });
    }
    if (user.isDefaulter() && !user.isOneDayOldDefaulter()) {
      report.incrementTotalDefaulters();
      report.addDefaulter({ name: user.getName(), email: user.getEmail() });
    }

    return report;
  }

  private fillReportWithStats(stat: EmailStats, report: Report) {
    if (stat.opened != 0) {
      report.incrementTotalEmailsOpened(stat.opened);
    }

    if (stat.sent != 0) {
      report.incrementTotalEmailsSent(stat.sent);
    }
  }

  private mapDomainReportToSendGridReport(report: Report): any {
    return {
      summary: {
        totalDefaulters: report.totalDefaulters(),
        lastReportDate: report.lastReportDate(),
        reportDate: report.reportDate(),
        totalWarningEmailsSent: report.totalEmailsSent(),
        totalEmailsRead: report.totalEmailsOpened(),
      },
      defaulters: report.defaulters(),
      oldDefaulters: report.oldDefaulters(),
      subject: 'Informe de clientes con tarifa caducada',
    };
  }
}
