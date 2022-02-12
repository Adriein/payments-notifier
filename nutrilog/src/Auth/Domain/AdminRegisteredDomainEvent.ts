import { DomainEvent } from "../../Shared/Domain/Entities/DomainEvent";
import { ID } from "../../Shared/Domain/VO/Id.vo";

export class AdminRegisteredDomainEvent extends DomainEvent {
  constructor(
    public readonly aggregateId: ID,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {
    super();
  }
}