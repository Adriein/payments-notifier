import { ApiQueryDomainEvent } from '../../Food/Domain/ApiQueryDomainEvent';
import { DomainEventsManager } from '../../Shared/Domain/Entities/DomainEventsManager';
import { IDomainEventHandler } from '../../Shared/Domain/Interfaces/IDomainEventHandler';

export class RegisterApiUsageHandler implements IDomainEventHandler {
  listen(): void {
    DomainEventsManager.subscribe(ApiQueryDomainEvent, async () => console.log('hola'));
  }
}
