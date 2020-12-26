import { INotifier } from '../../domain/interfaces';
import sgMail from '@sendgrid/mail';

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
  public async notify(destination: string, payload: string): Promise<void> {
    let msg;

    if(destination === 'ivanmfit@gmail.com') {
      msg = this.adminConfig(destination, payload);
    }else {
      msg = this.clientConfig(destination, payload);
    }
    
    await sgMail.send(msg);
  }

  private clientConfig(destination: string, payload: string): EmailConfig {
    return {
      to: destination,
      from: 'stoicweekly@gmail.com',
      subject: 'Información sobre pago',
      text: 'Información sobre pago',
      html: payload,
    };
  }

  private adminConfig(destination: string, payload: string): EmailConfig {
    return {
      to: destination,
      from: 'stoicweekly@gmail.com',
      subject: 'Informe sobre impagos',
      text: 'Informe sobre impagos',
      html: payload,
    };
  }
}
