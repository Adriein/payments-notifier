import { Collection } from "../../../../Shared/Domain/Entities/Collection";
import { Subscription } from "./Subscription.entity";
import { NoActiveSubscriptionError } from "../Error/NoActiveSubscriptionError";

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


}