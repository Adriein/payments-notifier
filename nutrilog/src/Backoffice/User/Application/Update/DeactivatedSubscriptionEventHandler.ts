import { IDomainEventHandler } from "../../../../Shared/Domain/Interfaces/IDomainEventHandler";
import { DomainEventsHandler } from "../../../../Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { DeactivatedSubscriptionDomainEvent } from "../../Domain/DomainEvents/DeactivatedSubscriptionDomainEvent";

@DomainEventsHandler(DeactivatedSubscriptionDomainEvent)
export class DeactivatedSubscriptionEventHandler implements IDomainEventHandler {
  public async handle(event: DeactivatedSubscriptionDomainEvent): Promise<void> {
    return Promise.resolve(undefined);
  }
}