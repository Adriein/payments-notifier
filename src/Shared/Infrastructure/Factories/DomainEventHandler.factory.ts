import { RegisterApiUsageHandler } from '../../../Backoffice/Metrics';
import { ApiUsageRepository } from '../../../Backoffice/Metrics/Infraestructure/Data/ApiUsageRepository';
import { IDomainEventHandler } from '../../Domain/Interfaces/IDomainEventHandler';
import { ConstructorFunc } from '../../Domain/types';
import { CreateAdminDomainEventHandler } from "../../../Backoffice/Users/Application/Create/CreateAdminDomainEventHandler";
import { UserRepository } from "../../../Backoffice/Users/Infrastructure/Data/UserRepository";
import { CryptoService } from "../../Domain/Services/CryptoService";
import { QueryBus } from "../Bus/QueryBus";
import { CreateAppConfigDomainEventHandler } from "../../../Backoffice/AppConfig/Application/CreateAppConfigDomainEventHandler";
import { AppConfigRepository } from "../../../Backoffice/AppConfig/Infrastructure/AppConfigRepository";

export default class DomainEventHandlerFactory {
  private handlers: Map<string, IDomainEventHandler> = new Map();

  private apiUsageRepo = new ApiUsageRepository();
  private userRepository = new UserRepository();
  private appConfigRepository = new AppConfigRepository();
  private crypto = new CryptoService();

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
    this.handlers.set(RegisterApiUsageHandler.name, new RegisterApiUsageHandler(this.apiUsageRepo));
    this.handlers.set(
      CreateAdminDomainEventHandler.name,
      new CreateAdminDomainEventHandler(this.userRepository, this.crypto, QueryBus.instance())
    );

    this.handlers.set(
      CreateAppConfigDomainEventHandler.name,
      new CreateAppConfigDomainEventHandler(this.appConfigRepository)
    );
  }

  public getContainer(): Map<string, IDomainEventHandler> {
    return this.handlers;
  }
}
