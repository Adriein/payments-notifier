import { Collection } from "../../../../Shared/Domain/Entities/Collection";
import { Subscription } from "./Subscription.entity";
import { NoActiveSubscriptionError } from "../Error/NoActiveSubscriptionError";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";

export class SubscriptionCollection extends Collection<Subscription> {
  public static build(subscriptionList: Subscription[]): SubscriptionCollection {
    return new SubscriptionCollection(subscriptionList);
  }

  constructor(data: Subscription[]) {
    super(data);
  }

  public getActiveSubscription(): Subscription {
    const subscription = this.data().find((subscription: Subscription) => subscription.isActive());

    if (!subscription) {
      throw new NoActiveSubscriptionError();
    }
    return subscription;
  }

  public containsClient(clientId: ID): boolean {
    return !!this.data().find((subscription: Subscription) => subscription.userId().value === clientId.value);
  }

  public getExpiredSubscriptionsOlderThanOneDay(): Subscription[] {
    return this.data()
      .filter((subscription: Subscription) => subscription.isExpired() && subscription.isExpirationDateOlderThan(1));
  }

  public getExpiredSubscriptionsToday(): Subscription[] {
    return this.data()
      .filter((subscription: Subscription) => subscription.isExpired() && subscription.isExpirationDateOlderThan(0));
  }

}