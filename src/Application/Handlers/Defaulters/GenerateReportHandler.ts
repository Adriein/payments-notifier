import {
  ADMIN_EMAIL_CONFIG_SUBJECT,
  BACKOFFICE_EMAIL,
  NOTIFICATIONS_EMAIL,
} from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';
import { TemplateEmailConfig } from '../../../Domain/Entities/Mail/TemplateEmailConfig';
import { IHandler, INotifier } from '../../../Domain/Interfaces';
import { IConfigRepository } from '../../../Domain/Interfaces/IConfigRepository';
import { IEmailApi } from '../../../Domain/Interfaces/IEmailApi';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { Report, ReportType } from '../../../Domain/Templates/Report.template';
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
  users: string[];
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

    const template: Report = {
      users: [],
      summary: {
        totalDefaulters: 0,
        newDefaulters: 0,
        lastReportDate: '',
        reportDate: Time.format(new Date(), Time.SEND_GRID_DATE_FORMAT),
        totalWarningEmailsSent: 0,
        totalEmailsRead: 0,
      },
    };

    for (const admin of admins) {
      const usersOnDb = await this.finder.adminId(admin.getId()).find();

      const config = await this.configRepository.findByAdminId(admin.getId());

      const stats = await this.api
        .setKey(key)
        .getEmailStats(
          Time.format(config!.lastSentReport!, Time.SEND_GRID_DATE_FORMAT),
          Time.format(new Date(), Time.SEND_GRID_DATE_FORMAT)
        );

      let report: ReportType = {
        summary: { defaulters: 0, notifieds: 0, total: usersOnDb.length },
        defaulters: [],
        notifieds: [],
      };

      for (const user of usersOnDb) {
        if (user.isDefaulter()) {
          template['summary']['totalDefaulters'] =
            template['summary']['totalDefaulters'] + 1;
        }
        if (user.isDefaulter() && !user.isOneDayOldDefaulter()) {
          template['summary']['newDefaulters'] =
            template['summary']['newDefaulters'] + 1;
          template['users'] = [...template['users'], user.getName()];
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
}
