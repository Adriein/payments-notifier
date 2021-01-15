import { Log } from '../../../Domain/Decorators/Log';
import { ICommand, IHandler, INotifier } from '../../../Domain/Interfaces';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { Report, ReportType } from '../../../Domain/Templates/Report.template';

export class GenerateReportHandler implements IHandler<void> {
  constructor(
    private notifier: INotifier,
    private usersRepository: IUserRepository
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: ICommand): Promise<void> {
    const usersOnDb = await this.usersRepository.findAll();

    let report: ReportType = {
      summary: { defaulters: 0, notifieds: 0, total: usersOnDb.length },
      defaulters: [],
      notifieds: [],
    };

    for (const user of usersOnDb) {
      if (user.isDefaulter()) {
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
