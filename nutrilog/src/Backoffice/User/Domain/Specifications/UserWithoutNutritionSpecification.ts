import { CompositeSpecification } from "../../../../Shared/Domain/Specification/CompositeSpecification";
import { User } from "../Entity/User.entity";

export class UserWithoutNutritionSpecification extends CompositeSpecification<User> {
  constructor(private usersWithNutrition: string[]) {
    super();
  }

  IsSatisfiedBy(candidate: User): boolean {
    return !this.usersWithNutrition.includes(candidate.id());
  }
}