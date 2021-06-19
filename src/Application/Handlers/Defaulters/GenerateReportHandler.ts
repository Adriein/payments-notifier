import {
  ADMIN_EMAIL_CONFIG_SUBJECT,
  BACKOFFICE_EMAIL,
  NOTIFICATIONS_EMAIL,
} from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';
import { AppConfig } from '../../../Domain/Entities/AppConfig.entity';
import { TemplateEmailConfig } from '../../../Domain/Entities/Mail/TemplateEmailConfig';
import { User } from '../../../Domain/Entities/User.entity';
import { IHandler, INotifier } from '../../../Domain/Interfaces';
import { IConfigRepository } from '../../../Domain/Interfaces/IConfigRepository';
import { IEmailApi } from '../../../Domain/Interfaces/IEmailApi';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { Time } from '../../../Infraestructure/Helpers/Time.utils';

type Summary = {
  totalDefaulters: number;
  newDefaulters: number;
  lastReportDate: string;
  reportDate: string;
  totalWarningEmailsSent: number;
  totalEmailsRead: number;
};

type Report = {
  defaulters: string[];
  oldDefaulters: string[];
  summary: Summary;
};

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

      const template = users.reduce((template: Report, user: User) => {
        return {...template, template: this.buildReport(user, template)}
      }, this.getTemplate());

      template.summary.newDefaulters = template.defaulters.length;
      template.summary.lastReportDate = Time.format(config!.lastSentReport!, Time.SEND_GRID_DATE_FORMAT);
      
      stats.reduce()
          

      if (report.defaulters.length === 0) {
        return;
      }

      // const template = await new Report(report, config!).generate();

      const destinatary =
        process.env.NODE_ENV! === 'PRO'
          ? process.env.ADMIN_EMAIL!
          : BACKOFFICE_EMAIL;

      await this.notifier.notify(
        new TemplateEmailConfig(NOTIFICATIONS_EMAIL, destinatary, '', template)
      );
    }
  }

  private async getEmailStats(key: string, config: AppConfig) {
    return await this.api
      .setKey(key)
      .getEmailStats(
        Time.format(config.lastSentReport!, Time.SEND_GRID_DATE_FORMAT),
        Time.format(new Date(), Time.SEND_GRID_DATE_FORMAT)
      );
  }

  private buildReport(user: User, template: Report): Report {
    if (user.isDefaulter() && user.isOneDayOldDefaulter()) {
      template['summary']['totalDefaulters'] = template['summary']['totalDefaulters'] + 1;
      template['oldDefaulters'] = [...template['oldDefaulters'], user.getName()];
    }
    if (user.isDefaulter() && !user.isOneDayOldDefaulter()) {
      template['defaulters'] = [...template['defaulters'], user.getName()];

    }

    return template;
  }

  private getTemplate(): Report {
    return {
      defaulters: [],
      oldDefaulters: [],
      summary: {
        totalDefaulters: 0,
        newDefaulters: 0,
        lastReportDate: '',
        reportDate: Time.format(new Date(), Time.SEND_GRID_DATE_FORMAT),
        totalWarningEmailsSent: 0,
        totalEmailsRead: 0,
      },
    };
  }
}
