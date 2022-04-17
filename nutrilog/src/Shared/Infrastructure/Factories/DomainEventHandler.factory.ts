import { IDomainEventHandler } from '../../Domain/Interfaces/IDomainEventHandler';
import { ConstructorFunc } from '../../Domain/types';
import { RegisteredTenantDomainEventHandler } from "../../../Backoffice/User/Application/CreateTenant/RegisteredTenantDomainEventHandler";
import { UserRepository } from "../../../Backoffice/User/Infrastructure/Data/UserRepository";
import { CryptoService } from "../../Domain/Services/CryptoService";
import { QueryBus } from "../Bus/QueryBus";
import { TenantCreatedDomainEventHandler } from "../../../Backoffice/AppConfig/Application/Create/TenantCreatedDomainEventHandler";
import { AppConfigRepository } from "../../../Backoffice/AppConfig/Infrastructure/AppConfigRepository";
import { TenantRepository } from "../../../Backoffice/User/Infrastructure/Data/TenantRepository";
import { ClientRepository } from "../../../Backoffice/User/Infrastructure/Data/ClientRepository";
import { SubscriptionRepository } from "../../../Backoffice/User/Infrastructure/Data/SubscriptionRepository";
import { AdminFinder } from "../../../Backoffice/User/Application/Service/AdminFinder";
import { RenewedSubscriptionDomainEvent } from "../../../Backoffice/User/Domain/DomainEvents/RenewedSubscriptionDomainEvent";
import { DeactivateOldSubscriptionEventHandler } from "../../../Backoffice/User/Application/RenewSubscription/DeactivateOldSubscriptionEventHandler";

export default class DomainEventHandlerFactory {
  private handlers: Map<string, IDomainEventHandler> = new Map();

  private userRepository = new UserRepository();
  private tenantRepository = new TenantRepository();
  private clientRepository = new ClientRepository();
  private subscriptionRepository = new SubscriptionRepository();
  private appConfigRepository = new AppConfigRepository();
  private crypto = new CryptoService();
  private adminFinder = new AdminFinder(this.userRepository, QueryBus.instance());

  constructor() {
    this.register();
  }

  public create<T>(_handler: ConstructorFunc<T>): IDomainEventHandler {
    const handler = this.handlers.get(_handler.name);

    if (!handler) {
      throw new Error('No domain event handler with this name');
    }

    return handler;
  }

  private register(): void {
    this.handlers.set(
      RegisteredTenantDomainEventHandler.name,
      new RegisteredTenantDomainEventHandler(
        this.tenantRepository,
        this.subscriptionRepository,
        this.crypto,
        QueryBus.instance(),
        this.adminFinder
      )
    );

    this.handlers.set(
      RenewedSubscriptionDomainEvent.name,
      new DeactivateOldSubscriptionEventHandler(
        this.subscriptionRepository,
      )
    );

    this.handlers.set(
      TenantCreatedDomainEventHandler.name,
      new TenantCreatedDomainEventHandler(this.appConfigRepository)
    );
  }

  public getContainer(): Map<string, IDomainEventHandler> {
    return this.handlers;
  }
}
