import { DomainEvent } from "../../../../Shared/Domain/Entities/DomainEvent";

export class AdminCreatedDomainEvent extends DomainEvent {
  constructor(
    public readonly aggregateId: string,
  ) {
    super();
  }
}