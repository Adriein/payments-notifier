import { DomainEvent } from "../../../../Shared/Domain/Entities/DomainEvent";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";

export class TenantCreatedDomainEvent extends DomainEvent {
  constructor(public readonly aggregateId: ID) {
    super();
  }
}