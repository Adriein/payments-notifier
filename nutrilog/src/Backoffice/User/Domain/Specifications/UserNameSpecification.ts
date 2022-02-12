import { CompositeSpecification } from "../../../../Shared/Domain/Specification/CompositeSpecification";
import { User } from "../Entity/User.entity";

export class UserNameSpecification extends CompositeSpecification<User> {
  constructor(private name: string) {
    super();
  }

  IsSatisfiedBy(candidate: User): boolean {
    return candidate.name() === this.name;
  }
}