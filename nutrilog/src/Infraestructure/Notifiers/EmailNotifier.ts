import { INotifier } from '../../Domain/Interfaces';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { Log } from '../../Shared/Domain/Decorators/Log';
import { IEmailConfig } from '../../Domain/Interfaces/IEmailConfig';

export class EmailNotifier implements INotifier {
  constructor() {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY!);
  }

  @Log(process.env.LOG_LEVEL)
  public async notify(config: IEmailConfig): Promise<void> {

    const email = this.removeEmptyProps(config);

    await sgMail.send(email as MailDataRequired);
  }

  private removeEmptyProps(config: IEmailConfig): Object {
    const obj: { [key: string]: string } = { ...config };

    return Object.keys(obj).reduce((acc: any, key: string) => {
      if (obj[key]) {
        return { ...acc, [key]: obj[key] };
      }

      return acc;
    }, {});
  }
}
