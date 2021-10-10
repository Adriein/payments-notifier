import { IDomainEventHandler } from "../../Shared/Domain/Interfaces/IDomainEventHandler";
import { DomainEventsHandler } from "../../Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { AdminCreatedDomainEvent } from "../../Auth/Domain/AdminCreatedDomainEvent";
import { Log } from "../../Domain/Decorators/Log";
import { IUserRepository } from "../Domain/IUserRepository";
import { User } from "../Domain/User.entity";
import { UserConfig } from "../Domain/UserConfig.entity";
import { Subscription } from "../Domain/Subscription.entity";
import { CryptoService } from "../../Shared/Domain/Services/CryptoService";
import { Pricing } from "../Domain/Pricing.vo";
import { LastPaymentDate } from "../../Shared/Domain/VO/LastPaymentDate.vo";
import { Email } from "../../Shared/Domain/VO/Email.vo";
import { ID } from "../../Shared/Domain/VO/Id.vo";
import { Password } from "../../Shared/Domain/VO/Password.vo";
import { LANG_ES, USER_ROLE } from "../../Domain/constants";
import { UserAlreadyExistsError } from "../Domain/UserAlreadyExistsError";

@DomainEventsHandler(AdminCreatedDomainEvent)
export class CreateAdminDomainEventHandler implements IDomainEventHandler {
  constructor(private repository: IUserRepository, private crypto: CryptoService) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(event: AdminCreatedDomainEvent): Promise<void> {
    const userExists = await this.repository.findByEmail(event.email);

    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    const id = ID.generate();
    const password = await this.crypto.hash(event.password);

    const user = new User(
      id,
      event.name,
      new Password(password),
      new Email(event.email),
      new UserConfig(ID.generate(), LANG_ES, USER_ROLE),
      id,
      Subscription.build(
        Pricing.build('annual', 365, 1000),
        new LastPaymentDate(new Date().toString())
      )
    );

    await this.repository.save(user);
  }
}