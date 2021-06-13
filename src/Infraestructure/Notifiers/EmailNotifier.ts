import { INotifier } from '../../Domain/Interfaces';
import sgMail from '@sendgrid/mail';
import { Log } from '../../Domain/Decorators/Log';
import { BACKOFFICE_EMAIL } from '../../Domain/constants';

type EmailConfig = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
};

export class EmailNotifier implements INotifier {
  constructor() {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY!);
  }
  @Log(process.env.LOG_LEVEL)
  public async notify(
    destination: string,
    payload: string,
    subject?: string
  ): Promise<void> {
    let msg;

    if (destination === process.env.ADMIN_EMAIL) {
      msg = this.adminConfig(destination, payload);
      await sgMail.send(msg);
      return;
    }

    if (destination === BACKOFFICE_EMAIL) {
      msg = this.backOfficeConfig(destination, payload, subject!);
      await sgMail.send(msg);
      return;
    }

    msg = this.clientConfig(destination, payload);

    await sgMail.send(msg);
  }

  private clientConfig(destination: string, payload: string): EmailConfig {
    return {
      to: destination,
      from: 'ivanmfit.notificaciones@gmail.com',
      subject: 'Información sobre pago',
      text: 'Información sobre pago',
      html: payload,
    };
  }

  private adminConfig(destination: string, payload: string): EmailConfig {
    return {
      to: destination,
      from: 'ivanmfit.notificaciones@gmail.com',
      subject: 'Informe sobre impagos',
      text: 'Informe sobre impagos',
      html: payload,
    };
  }

  private backOfficeConfig(
    destination: string,
    payload: string,
    subject: string
  ): EmailConfig {
    return {
      to: destination,
      from: 'ivanmfit.notificaciones@gmail.com',
      subject,
      text: subject,
      html: payload,
    };
  }
}
