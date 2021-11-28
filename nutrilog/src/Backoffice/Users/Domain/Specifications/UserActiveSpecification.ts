import { CompositeSpecification } from "../../../../Shared/Domain/Specification/CompositeSpecification";
import { User } from "../User.entity";

export class UserActiveSpecification extends CompositeSpecification<User> {
  constructor(private active: boolean) {
    super();
  }

  IsSatisfiedBy(candidate: User): boolean {
    return candidate.isActive() === this.active;
  }
}