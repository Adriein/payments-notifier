import { ICommand, IHandler, INotifier } from '../../../domain/interfaces';
import { Report, ReportType } from '../../../domain/templates/Report.template';
import { UserRepository } from '../../../infraestructure/Data/Repositories/UserRepository';

export class GenerateReportHandler implements IHandler<void> {
  constructor(
    private notifier: INotifier,
    private usersRepository: UserRepository
  ) {}

  public async handle(command: ICommand): Promise<void> {
    const usersOnDb = await this.usersRepository.findAll();

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

    const template = new Report(
      process.env.NODE_ENV! === 'PRO' ? process.env.ADMIN_NAME! : 'Adri',
      report
    ).generate();

    await this.notifier.notify(
      process.env.NODE_ENV! === 'PRO'
        ? process.env.ADMIN_EMAIL!
        : 'adria.claret@gmail.com',
      template
    );
  }
}
