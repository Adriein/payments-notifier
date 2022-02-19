import { CommandHandler } from "../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IHandler } from "../../Shared/Domain/Interfaces/IHandler";
import { RegisterAdminCommand } from "../Domain/Command/RegisterAdminCommand";
import { DomainEventsManager } from "../../Shared/Domain/Entities/DomainEventsManager";
import { Email } from "../../Shared/Domain/VO/Email.vo";
import { Password } from "../../Shared/Domain/VO/Password.vo";
import { Auth } from "../Domain/Auth.entity";
import { Log } from "../../Shared/Domain/Decorators/Log";
import { TenantRegisteredDomainEvent } from "../Domain/TenantRegisteredDomainEvent";

@CommandHandler(RegisterAdminCommand)
export class RegisterAdminHandler implements IHandler<void> {

  @Log(process.env.LOG_LEVEL)
  public async handle(command: RegisterAdminCommand): Promise<void> {
    const email = new Email(command.email);
    const password = new Password(command.password);

    const auth = Auth.build(command.name, email, password);

    auth.addEvent(new TenantRegisteredDomainEvent(auth.id(), auth.name(), auth.email(), auth.password()));
    await DomainEventsManager.publishEvents(auth.id());
  }

}