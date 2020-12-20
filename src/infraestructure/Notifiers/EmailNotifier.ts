import { INotifier } from '../../domain/interfaces';
import sgMail from '@sendgrid/mail';

export class EmailNotifier implements INotifier {
  constructor() {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY!);
  }
  public async notify(destination: string, payload: string): Promise<void> {
    const msg = {
      to: destination,
      from: 'stoicweekly@gmail.com',
      subject: 'Información sobre pago',
      text: 'Información sobre pago',
      html: payload,
    };

    await sgMail.send(msg);
  }
}
