import { DomainEvent } from "../../../../Shared/Domain/Entities/DomainEvent";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";

export class SendAboutToExpireEmailDomainEvent extends DomainEvent {
  constructor(public readonly aggregateId: ID, public readonly userId: ID) {
    super();
  }
}