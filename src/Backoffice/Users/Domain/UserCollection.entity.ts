import { Collection } from "../../../Shared/Domain/Entities/Collection";
import { User } from "./User.entity";
import { UserWithoutPricingError } from "./UserWithoutPricingError";

export class UserCollection extends Collection<User> {
  constructor(data: User[]) {
    super(data);
  }

  public defaulters(): User[] {
    const result: User[] = [];

    for (const user of this.get()) {
      if (user.isSubscriptionExpired()) {
        result.push(user);
      }
    }

    return result;
  }

  public longTermDefaulters(pricing: Map<string, number>): User[] {
    const result: User[] = [];

    for (const user of this.get()) {
      const duration = pricing.get(user.pricingId());

      if (!duration) {
        throw new UserWithoutPricingError(user.name(), user.id());
      }

      const daysFromExpiration = user.howLongHasSubscriptionExpired(duration);

      if (daysFromExpiration >= 1) {
        result.push(user);
      }
    }

    return result;
  }
}