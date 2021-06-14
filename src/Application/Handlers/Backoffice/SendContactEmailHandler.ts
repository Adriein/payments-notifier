import { ContactEmailCommand } from '../../../Domain/Commands/Backoffice/ContactEmailCommand';
import {
  BACKOFFICE_EMAIL,
  CONTACT_DYNAMIC_TEMPLATE,
} from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';
import { ICommand, IHandler, INotifier } from '../../../Domain/Interfaces';
import { IEmailApi } from '../../../Domain/Interfaces/IEmailApi';

export class SendContactEmailHandler implements IHandler<void> {
  constructor(private notifier: INotifier) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<void> {
    const command = comm as ContactEmailCommand;

    await this.notifier.notify(BACKOFFICE_EMAIL, command.emailContent, {
      subject: command.subject,
      templateId: id,
      sender: command.email,
    });
  }
}
