import { Log } from '../../../Domain/Decorators/Log';
import { IHandler, INotifier } from '../../../Domain/Interfaces';
import { Report, ReportType } from '../../../Domain/Templates/Report.template';

export class SendContactEmailHandler implements IHandler<void> {
  constructor(private notifier: INotifier) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(): Promise<void> {

    await this.notifier.notify(
      process.env.NODE_ENV! === 'PRO'
        ? process.env.ADMIN_EMAIL!
        : 'adria.claret@gmail.com',
      template
    );
  }
}
