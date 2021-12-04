import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { SendContactEmailCommand } from "../Domain/Command/SendContactEmailCommand";
import { CommandHandler } from "../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { Log } from "../../../Shared/Domain/Decorators/Log";
import { IEmailNotificationRepository } from "../Domain/IEmailNotificationRepository";
import { NutrilogEmail } from "../Domain/NutrilogEmail.entity";
import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { EmailHeader } from "../Domain/EmailHeader.entity";
import { BACKOFFICE_EMAIL } from "../../../Domain/constants";
import { Email } from "../../../Shared/Domain/VO/Email.vo";

@CommandHandler(SendContactEmailCommand)
export class SendContactEmailHandler implements IHandler<void> {
  constructor(private readonly repository: IEmailNotificationRepository<NutrilogEmail<string>>) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: SendContactEmailCommand): Promise<void> {
    const sender = new Email(command.email);
    const recipient = new Email(BACKOFFICE_EMAIL);

    const header = new EmailHeader(
      command.subject,
      sender,
      recipient,
      ''
    );

    const email = NutrilogEmail.build<string>(header, command.emailContent);

    await this.repository.send(email);
  }

}