import { CommandHandler } from "../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IHandler } from "../../Shared/Domain/Interfaces/IHandler";
import { RegisterAdminCommand } from "../Domain/Command/RegisterAdminCommand";
import { IAuthRepository } from "../Domain/IAuthRepository";
import { DomainEventsManager } from "../../Shared/Domain/Entities/DomainEventsManager";
import { Email } from "../../Shared/Domain/VO/Email.vo";
import { Password } from "../../Shared/Domain/VO/Password.vo";
import { Auth } from "../Domain/Auth.entity";

@CommandHandler(RegisterAdminCommand)
export class RegisterAdminHandler implements IHandler<void> {
  public async handle(command: RegisterAdminCommand): Promise<void> {
    const email = new Email(command.email);
    const password = new Password(command.password);

    const auth = new Auth(command.name, email, password);

    await DomainEventsManager.publishEvents(auth.id());
  }

}