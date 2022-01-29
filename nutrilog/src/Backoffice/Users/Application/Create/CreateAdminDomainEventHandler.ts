import { IDomainEventHandler } from "../../../../Shared/Domain/Interfaces/IDomainEventHandler";
import { DomainEventsHandler } from "../../../../Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { AdminRegisteredDomainEvent } from "../../../../Auth/Domain/AdminRegisteredDomainEvent";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { IUserRepository } from "../../Domain/IUserRepository";
import { User } from "../../Domain/Entity/User.entity";
import { UserConfig } from "../../Domain/Entity/UserConfig.entity";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { CryptoService } from "../../../../Shared/Domain/Services/CryptoService";
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Password } from "../../../../Shared/Domain/VO/Password.vo";
import { ADMIN_ROLE, LANG_ES, YEARLY_PRICING } from "../../Domain/constants";
import { UserAlreadyExistsError } from "../../Domain/UserAlreadyExistsError";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { SearchRoleQuery } from "../../../Role/Domain/SearchRoleQuery";
import { SearchPricingQuery } from "../../../Pricing/Domain/Query/SearchPricingQuery";
import { AdminCreatedDomainEvent } from "../../Domain/DomainEvents/AdminCreatedDomainEvent";
import { DomainEventsManager } from "../../../../Shared/Domain/Entities/DomainEventsManager";
import { Time } from "../../../../Shared/Infrastructure/Helper/Time";

@DomainEventsHandler(AdminRegisteredDomainEvent)
export class CreateAdminDomainEventHandler implements IDomainEventHandler {
  constructor(
    private repository: IUserRepository,
    private crypto: CryptoService,
    private queryBus: IQueryBus<PricingResponse>
  ) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(event: AdminRegisteredDomainEvent): Promise<void> {
    const result = await this.repository.findByEmail(event.email);

    if (result.isRight()) {
      throw new UserAlreadyExistsError();
    }

    const id = ID.generate();
    const password = await this.crypto.hash(event.password);

    const pricing = await this.queryBus.ask(new SearchPricingQuery(YEARLY_PRICING));
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
        new DateVo(new Date().toString()),
        new DateVo(Time.add(new Date(), pricing.duration))
      ),
      true
    );

    await this.repository.save(user);

    user.addEvent(new AdminCreatedDomainEvent(user.id()));

    await DomainEventsManager.publishEvents(user.id());
  }
}