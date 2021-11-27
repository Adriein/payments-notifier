import { IDomainEventHandler } from "../../../Shared/Domain/Interfaces/IDomainEventHandler";
import { SendAboutToExpireEmailDomainEvent } from "../Domain/DomainEvents/SendAboutToExpireEmailDomainEvent";
import { DomainEventsHandler } from "../../../Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { Log } from "../../../Shared/Domain/Decorators/Log";

@DomainEventsHandler(SendAboutToExpireEmailDomainEvent)
export class SendAboutToExpireNotificationDomainEventHandler implements IDomainEventHandler {

  @Log(process.env.LOG_LEVEL)
  public async handle(event: SendAboutToExpireEmailDomainEvent): Promise<void> {
    return Promise.resolve(undefined);
  }
}