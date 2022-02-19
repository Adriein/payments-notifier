import { IDomainEventHandler } from "../../../../Shared/Domain/Interfaces/IDomainEventHandler";
import { DomainEventsHandler } from "../../../../Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { TenantRegisteredDomainEvent } from "../../../../Auth/Domain/TenantRegisteredDomainEvent";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { IUserRepository } from "../../Domain/IUserRepository";
import { User } from "../../Domain/Entity/User.entity";
import { CryptoService } from "../../../../Shared/Domain/Services/CryptoService";
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Password } from "../../../../Shared/Domain/VO/Password.vo";
import { TENANT_ROLE, YEARLY_PRICING } from "../../Domain/constants";
import { UserAlreadyExistsError } from "../../Domain/Error/UserAlreadyExistsError";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { SearchRoleQuery } from "../../../Role/Domain/SearchRoleQuery";
import { SearchPricingQuery } from "../../../Pricing/Domain/Query/SearchPricingQuery";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { SearchRoleResponse } from "../../../Role/Application/SearchRoleResponse";
import { Tenant } from "../../Domain/Entity/Tenant.entity";
import { AdminFinder } from "../Service/AdminFinder";

@DomainEventsHandler(TenantRegisteredDomainEvent)
export class RegisteredTenantDomainEventHandler implements IDomainEventHandler {
  constructor(
    private repository: IUserRepository,
    private subscriptionRepository: ISubscriptionRepository,
    private crypto: CryptoService,
    private queryBus: IQueryBus,
    private finder: AdminFinder,
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(event: TenantRegisteredDomainEvent): Promise<void> {
    await this.ensureUserNotExists(event.email);

    const tenant = await this.createTenant(event);

    await this.createSubscriptionToTenant(tenant)
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

  private async findTenantRole(): Promise<SearchRoleResponse> {
    return await this.queryBus.ask(new SearchRoleQuery(TENANT_ROLE));
  }

  private async findAdmin(): Promise<User> {
    return await this.finder.execute();
  }

  private async createTenant(event: TenantRegisteredDomainEvent): Promise<Tenant> {
    const role = await this.findTenantRole();
    const admin = await this.findAdmin();

    const password = await this.crypto.hash(event.password);

    const tenant = Tenant.build(
      event.name,
      new Password(password),
      new Email(event.email),
      admin.id(),
      new ID(role.id)
    );

    await this.repository.save(tenant);

    return tenant;
  }

  private async createSubscriptionToTenant(user: User): Promise<void> {
    const pricing = await this.findYearlyPricing();

    const subscription = user.createSubscription(
      new ID(pricing.id),
      new DateVo(new Date().toString()),
      pricing.duration
    );

    await this.subscriptionRepository.save(subscription);
  }
}