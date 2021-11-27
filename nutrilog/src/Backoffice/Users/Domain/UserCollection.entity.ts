import { Collection } from "../../../Shared/Domain/Entities/Collection";
import { User } from "./User.entity";
import { UserWithoutPricingError } from "./UserWithoutPricingError";

export class UserCollection extends Collection<User> {
  private readonly _defaulters: User[];

  constructor(data: User[]) {
    super(data);
    this._defaulters = this.checkDefaulters();
  }

  public totalDefaulters(): number {
    return this._defaulters.length
  }

  public defaulters(): User[] {
    return this._defaulters;
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

  private checkDefaulters(): User[] {
    const result: User[] = [];

    for (const user of this.get()) {
      if (user.isSubscriptionExpired()) {
        result.push(user);
      }
    }

    return result;
  }
}