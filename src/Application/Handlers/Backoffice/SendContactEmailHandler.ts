import { ContactEmailCommand } from '../../../Domain/Commands/Backoffice/ContactEmailCommand';
import { CONTACT_DYNAMIC_TEMPLATE } from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';
import { ICommand, IHandler, INotifier } from '../../../Domain/Interfaces';
import { IApi } from '../../../Domain/Interfaces/IApi';
import { IEmailApi } from '../../../Domain/Interfaces/IEmailApi';

export class SendContactEmailHandler implements IHandler<void> {
  constructor(private notifier: INotifier, private emailApi: IEmailApi) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<void> {
    const command = comm as ContactEmailCommand;

    const id = await this.emailApi.getDynamicTemplateId(CONTACT_DYNAMIC_TEMPLATE);

    console.log(id);

    //await this.notifier.notify(command.emailContent, command.subject, template);
  }
}
