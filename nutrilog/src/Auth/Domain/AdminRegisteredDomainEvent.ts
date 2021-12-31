import { DomainEvent } from "../../Shared/Domain/Entities/DomainEvent";

export class AdminRegisteredDomainEvent extends DomainEvent {
  constructor(
    public readonly aggregateId: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {
    super();
  }
}