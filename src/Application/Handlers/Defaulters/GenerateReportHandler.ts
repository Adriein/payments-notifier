import { Log } from '../../../Domain/Decorators/Log';
import { ICommand, IHandler, INotifier } from '../../../Domain/Interfaces';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { Report, ReportType } from '../../../Domain/Templates/Report.template';

export class GenerateReportHandler implements IHandler<void> {
  constructor(private notifier: INotifier, private finder: UserFinder) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: ICommand): Promise<void> {
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

      const template = new Report(report).generate();

      await this.notifier.notify(
        process.env.NODE_ENV! === 'PRO'
          ? process.env.ADMIN_EMAIL!
          : 'adria.claret@gmail.com',
        template
      );
    }
  }
}
