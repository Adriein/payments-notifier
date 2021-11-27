import { IDomainEventHandler } from "../../../Shared/Domain/Interfaces/IDomainEventHandler";
import { SendAboutToExpireEmailDomainEvent } from "../Domain/DomainEvents/SendAboutToExpireEmailDomainEvent";
import { DomainEventsHandler } from "../../../Shared/Domain/Decorators/DomainEventsHandler.decorator";

@DomainEventsHandler(SendAboutToExpireEmailDomainEvent)
export class SendAboutToExpireNotificationDomainEventHandler implements IDomainEventHandler {
  public async handle(event: SendAboutToExpireEmailDomainEvent): Promise<void> {
    return Promise.resolve(undefined);
  }
}