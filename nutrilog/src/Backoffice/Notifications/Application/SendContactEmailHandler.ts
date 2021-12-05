import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { SendContactEmailCommand } from "../Domain/Command/SendContactEmailCommand";
import { CommandHandler } from "../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { Log } from "../../../Shared/Domain/Decorators/Log";
import { ISmtpServiceRepository } from "../Domain/Repository/ISmtpServiceRepository";
import { NutrilogEmail } from "../Domain/Entity/NutrilogEmail.entity";
import { EmailHeader } from "../Domain/Entity/EmailHeader.entity";
import { Email } from "../../../Shared/Domain/VO/Email.vo";
import { BACKOFFICE_EMAIL, CONTACT_DYNAMIC_TEMPLATE } from "../Domain/constants";

@CommandHandler(SendContactEmailCommand)
export class SendContactEmailHandler implements IHandler<void> {
  constructor(private readonly repository: ISmtpServiceRepository<NutrilogEmail<string>>) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: SendContactEmailCommand): Promise<void> {
    const sender = new Email(command.email);
    const recipient = new Email(BACKOFFICE_EMAIL);

    const header = new EmailHeader(
      command.subject,
      sender,
      recipient,
      CONTACT_DYNAMIC_TEMPLATE
    );

    const email = NutrilogEmail.build<string>(header, command.emailContent);

    await this.repository.send(email);
  }
}