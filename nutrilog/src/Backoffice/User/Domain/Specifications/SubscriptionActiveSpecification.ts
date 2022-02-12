import { CompositeSpecification } from "../../../../Shared/Domain/Specification/CompositeSpecification";
import { User } from "../Entity/User.entity";

export class SubscriptionActiveSpecification extends CompositeSpecification<User> {
  constructor(private active: boolean) {
    super();
  }

  IsSatisfiedBy(candidate: User): boolean {
    return candidate.isSubscriptionActive() === this.active;
  }
}