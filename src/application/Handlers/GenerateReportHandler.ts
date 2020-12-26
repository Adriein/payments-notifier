import { User } from '../../domain/entities/User.entity';
import { ICommand, IHandler, INotifier } from '../../domain/interfaces';
import { IRepository } from '../../domain/interfaces/IRepository';
import { Report, ReportType } from '../../domain/templates/Report.template';

export class GenerateReportHandler implements IHandler<void> {
  constructor(
    private notifier: INotifier,
    private repository: IRepository<User>
  ) {}

  public async handle(command: ICommand): Promise<void> {
    const usersOnDb = await this.repository.find({});

    let report: ReportType = {
      summary: { defaulters: 0, notifieds: 0, total: usersOnDb.length },
      defaulters: [],
      notifieds: [],
    };

    for (const user of usersOnDb) {
      if (user.getIsNotified()) {
        report['summary']['defaulters'] = report['summary']['defaulters'] + 1;
        report['defaulters'] = [...report['defaulters'], user];
        continue;
      }
      if (user.getIsWarned()) {
        report['summary']['notifieds'] = report['summary']['notifieds'] + 1;
        report['notifieds'] = [...report['notifieds'], user];
      }
    }

    const template = new Report('Ivan', report).generate();

    this.notifier.notify('adria.claret@gmail.com', template);
  }
}
