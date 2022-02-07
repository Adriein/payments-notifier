import { Collection } from "../../../../Shared/Domain/Entities/Collection";
import { Subscription } from "./Subscription.entity";
import { NoActiveSubscriptionError } from "../NoActiveSubscriptionError";

export class SubscriptionCollection extends Collection<Subscription> {
  public static build(subscription: Subscription): SubscriptionCollection {
    return new SubscriptionCollection([ subscription ]);
  }

  constructor(data: Subscription[]) {
    super(data);
  }

  public getActiveSubscription(): Subscription {
    const subscription = this.get().find((subscription: Subscription) => subscription.isActive());

    if (!subscription) {
      throw new NoActiveSubscriptionError();
    }
    return subscription;
  }


}