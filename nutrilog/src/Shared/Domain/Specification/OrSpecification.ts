import { CompositeSpecification } from "./CompositeSpecification";
import { ICompositeSpecification } from "./ICompositeSpecification";

class OrSpecification<T> extends CompositeSpecification<T> {
  constructor(
    public left: ICompositeSpecification<T>,
    public right: ICompositeSpecification<T>
  ) {
    super();
  }

  IsSatisfiedBy(candidate: T): boolean {
    return this.left.IsSatisfiedBy(candidate)
      || this.right.IsSatisfiedBy(candidate);
  }
}