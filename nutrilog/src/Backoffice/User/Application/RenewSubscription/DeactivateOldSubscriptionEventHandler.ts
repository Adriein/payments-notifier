import { IDomainEventHandler } from "../../../../Shared/Domain/Interfaces/IDomainEventHandler";
import { DomainEventsHandler } from "../../../../Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { RenewedSubscriptionDomainEvent } from "../../Domain/DomainEvents/RenewedSubscriptionDomainEvent";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { SubscriptionFilter } from "../../Domain/Filter/SubscriptionFilter";
import { SubscriptionCollection } from "../../Domain/Entity/SubscriptionCollection";

@DomainEventsHandler(RenewedSubscriptionDomainEvent)
export class DeactivateOldSubscriptionEventHandler implements IDomainEventHandler {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
  ) {}

  public async handle(event: RenewedSubscriptionDomainEvent): Promise<void> {

    const subscriptionList = await this.findActiveSubscriptionList(event);

    const activeSubscription = subscriptionList.getActiveSubscription();

    activeSubscription.deactivate();

    await this.subscriptionRepository.update(activeSubscription);

  }

  private async findActiveSubscriptionList(event: RenewedSubscriptionDomainEvent): Promise<SubscriptionCollection> {
    const criteria = new Criteria<SubscriptionFilter>();
    criteria.equal('userId', event.aggregateId);
    criteria.equal('isActive', true);

    const result = await this.subscriptionRepository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return new SubscriptionCollection(result.value);
  }

}