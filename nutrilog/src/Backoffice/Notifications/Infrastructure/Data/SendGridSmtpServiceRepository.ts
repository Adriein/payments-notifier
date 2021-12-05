import { ISmtpServiceRepository } from "../../Domain/Repository/ISmtpServiceRepository";
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { IEmailMapper } from "../../Domain/IEmailMapper";

export class SendGridSmtpServiceRepository<D, M extends MailDataRequired> implements ISmtpServiceRepository<D> {
  constructor(private mapper: IEmailMapper<D, M>) {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY!);
  }

  public async send(email: D): Promise<void> {
    const dataModel = this.mapper.toDataModel(email);
    await sgMail.send(dataModel);
  }
}