import { RegisterApiUsageHandler } from '../../../Backoffice/Application/RegisterApiUsageHandler';
import { ApiUsageRepository } from '../../../Backoffice/Infrastructure/Data/ApiUsageRepository';
import { ApiQueryDomainEvent } from '../../../Food/Domain/ApiQueryDomainEvent';
import { IDomainEventHandler } from '../../Domain/Interfaces/IDomainEventHandler';
import { ConstructorFunc } from '../../Domain/types';

export default class DomainEventHandlerFactory {
  private handlers: Map<string, IDomainEventHandler> = new Map();

  private apiUsageRepo = new ApiUsageRepository();

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
    this.handlers.set(ApiQueryDomainEvent.name, new RegisterApiUsageHandler(this.apiUsageRepo));
  }
}
