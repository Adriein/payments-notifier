import { IEmailNotificationRepository } from "../../Domain/IEmailNotificationRepository";
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { IEmailMapper } from "../../Domain/IEmailMapper";

export class SendGridEmailRepository<D, M extends MailDataRequired> implements IEmailNotificationRepository<D> {
  private mapper!: IEmailMapper<D, M>;

  public async send(email: D): Promise<void> {
    const dataModel = this.mapper.toDataModel(email);
    await sgMail.send(dataModel);
  }
}