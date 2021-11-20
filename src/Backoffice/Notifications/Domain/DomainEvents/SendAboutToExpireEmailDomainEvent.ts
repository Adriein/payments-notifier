import { DomainEvent } from "../../../../Shared/Domain/Entities/DomainEvent";

export class SendAboutToExpireEmailDomainEvent extends DomainEvent {
  constructor(public readonly aggregateId: string) {
    super();
  }
}