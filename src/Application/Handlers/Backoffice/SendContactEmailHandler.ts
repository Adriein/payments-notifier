import { ContactEmailCommand } from '../../../Domain/Commands/Backoffice/ContactEmailCommand';
import {
  BACKOFFICE_EMAIL,
  CONTACT_DYNAMIC_TEMPLATE,
  NOTIFICATIONS_EMAIL,
} from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';
import { TemplateEmailConfig } from '../../../Domain/Entities/Mail/TemplateEmailConfig';
import { ICommand, IHandler, INotifier } from '../../../Domain/Interfaces';

export class SendContactEmailHandler implements IHandler<void> {
  constructor(private notifier: INotifier) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<void> {
    const command = comm as ContactEmailCommand;

    await this.notifier.notify(
      new TemplateEmailConfig(
        NOTIFICATIONS_EMAIL,
        BACKOFFICE_EMAIL,
        CONTACT_DYNAMIC_TEMPLATE,
        {
          subject: command.subject,
          emailContent: command.emailContent,
          sender: command.email,
        }
      )
    );
  }
}
