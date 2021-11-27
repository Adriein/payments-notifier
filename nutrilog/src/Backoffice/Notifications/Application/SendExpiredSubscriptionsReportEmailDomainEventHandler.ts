import { IDomainEventHandler } from "../../../Shared/Domain/Interfaces/IDomainEventHandler";
import { SendExpiredSubscriptionsReportEmailDomainEvent } from "../Domain/DomainEvents/SendExpiredSubscriptionsReportEmailDomainEvent";
import { DomainEventsHandler } from "../../../Shared/Domain/Decorators/DomainEventsHandler.decorator";

@DomainEventsHandler(SendExpiredSubscriptionsReportEmailDomainEvent)
export class SendExpiredSubscriptionsReportEmailDomainEventHandler implements IDomainEventHandler {
  public async handle(event: SendExpiredSubscriptionsReportEmailDomainEvent): Promise<void> {
    return Promise.resolve(undefined);
  }
}