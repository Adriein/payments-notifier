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

type NotifyOptions = { subject?: string; templateId?: string, sender?: string };

export class EmailNotifier implements INotifier {
  constructor() {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY!);
  }
  @Log(process.env.LOG_LEVEL)
  public async notify(
    destination: string,
    payload: string,
    options?: NotifyOptions
  ): Promise<void> {
    let msg;
    console.log(destination);
    if (destination === process.env.ADMIN_EMAIL) {
      msg = this.adminConfig(destination, payload);
      await sgMail.send(msg);
      return;
    }

    if (destination === BACKOFFICE_EMAIL) {
      console.log(this.backOfficeConfig(destination, payload, options!));
      
      msg = this.backOfficeConfig(destination, payload, options!);
      try {
        await sgMail.send(msg);
        
      } catch(e){console.log(e); throw new Error()}
      //await sgMail.send(msg);
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
    options: NotifyOptions
  ): any {
    return {
      to: destination,
      from: 'ivanmfit.notificaciones@gmail.com',
      templateId: 'd-1a4d9a0041254c23b307526a6bd603ef',
      dynamicTemplateData: {
        subject: options.subject!,
        Sender_Name: 'Adrià Claret',
        Sender_Address: BACKOFFICE_EMAIL,
        Sender_City: 'Rubi',
        Sender_State: 'Barcelona',
        Sender_Zip: '08191',
        emailContent: payload,
        sender: options.sender!
      },
    };
  }
}
