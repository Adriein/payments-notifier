import { IDomainEventHandler } from "../../../Shared/Domain/Interfaces/IDomainEventHandler";
import { DomainEventsHandler } from "../../../Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { AdminCreatedDomainEvent } from "../../../Auth/Domain/AdminCreatedDomainEvent";
import { Log } from "../../../Shared/Domain/Decorators/Log";
import { IUserRepository } from "../Domain/IUserRepository";
import { User } from "../Domain/User.entity";
import { UserConfig } from "../Domain/UserConfig.entity";
import { Subscription } from "../Domain/Subscription.entity";
import { CryptoService } from "../../../Shared/Domain/Services/CryptoService";
import { LastPaymentDate } from "../../../Shared/Domain/VO/LastPaymentDate.vo";
import { Email } from "../../../Shared/Domain/VO/Email.vo";
import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { Password } from "../../../Shared/Domain/VO/Password.vo";
import { ADMIN_ROLE, LANG_ES } from "../../../Domain/constants";
import { UserAlreadyExistsError } from "../Domain/UserAlreadyExistsError";
import { IQueryBus } from "../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponseDto } from "../../Pricing/Application/PricingResponse.dto";
import { SearchRoleQuery } from "../../Role/Domain/SearchRoleQuery";
import { SearchPricingQuery } from "../../Pricing/Domain/SearchPricingQuery";

@DomainEventsHandler(AdminCreatedDomainEvent)
export class CreateAdminDomainEventHandler implements IDomainEventHandler {
  constructor(
    private repository: IUserRepository,
    private crypto: CryptoService,
    private queryBus: IQueryBus<PricingResponseDto>
  ) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(event: AdminCreatedDomainEvent): Promise<void> {
    const userExists = await this.repository.findByEmail(event.email);

    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    const id = ID.generate();
    const password = await this.crypto.hash(event.password);

    const pricing = await this.queryBus.ask(new SearchPricingQuery('yearly'));
    const role = await this.queryBus.ask(new SearchRoleQuery(ADMIN_ROLE));

    const user = new User(
      id,
      event.name,
      new Password(password),
      new Email(event.email),
      new UserConfig(ID.generate(), LANG_ES),
      id,
      new ID(role.id),
      Subscription.build(
        new ID(pricing.id),
        new LastPaymentDate(new Date().toString())
      )
    );

    await this.repository.save(user);
  }
}