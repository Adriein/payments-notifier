import { DomainEvent } from "../../../../Shared/Domain/Entities/DomainEvent";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";

export class AdminCreatedDomainEvent extends DomainEvent {
  constructor(public readonly aggregateId: ID) {
    super();
  }
}