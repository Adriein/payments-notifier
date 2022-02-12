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
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { SearchRoleResponse } from "../../../Role/Application/SearchRoleResponse";

@DomainEventsHandler(AdminRegisteredDomainEvent)
export class CreateAdminDomainEventHandler implements IDomainEventHandler {
  constructor(
    private repository: IUserRepository,
    private subscriptionRepository: ISubscriptionRepository,
    private crypto: CryptoService,
    private queryBus: IQueryBus
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(event: AdminRegisteredDomainEvent): Promise<void> {
    await this.ensureUserNotExists(event.email);

    const user = await this.createAdmin(event);

    await this.createSubscriptionToUser(user)
  }

  private async ensureUserNotExists(emailInEvent: string): Promise<void> {
    const email = new Email(emailInEvent);
    const result = await this.repository.findByEmail(email.value);

    if (result.isRight()) {
      throw new UserAlreadyExistsError();
    }
  }

  private async findYearlyPricing(): Promise<PricingResponse> {
    return await this.queryBus.ask(new SearchPricingQuery(YEARLY_PRICING));
  }

  private async findAdminRole(): Promise<SearchRoleResponse> {
    return await this.queryBus.ask(new SearchRoleQuery(ADMIN_ROLE));
  }

  private async createAdmin(event: AdminRegisteredDomainEvent): Promise<User> {
    const role = await this.findAdminRole();

    const id = ID.generate();
    const password = await this.crypto.hash(event.password);

    const user = new User(
      id,
      event.name,
      new Password(password),
      new Email(event.email),
      new UserConfig(ID.generate(), LANG_ES),
      id,
      new ID(role.id),
      true
    );

    await this.repository.save(user);

    user.addEvent(new AdminCreatedDomainEvent(user.id()));

    DomainEventsManager.publishEvents(user.id());

    return user;
  }

  private async createSubscriptionToUser(user: User): Promise<void> {
    const pricing = await this.findYearlyPricing();

    const subscription = user.createSubscription(
      new ID(pricing.id),
      new DateVo(new Date().toString()),
      new DateVo(Time.add(new Date(), pricing.duration))
    );

    await this.subscriptionRepository.save(subscription);
  }
}