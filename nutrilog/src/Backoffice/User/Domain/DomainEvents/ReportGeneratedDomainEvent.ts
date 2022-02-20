import { DomainEvent } from "../../../../Shared/Domain/Entities/DomainEvent";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";

export class ReportGeneratedDomainEvent extends DomainEvent {
  constructor(
    public readonly aggregateId: ID,
    public readonly oldDefaulters: { name: string, email: string }[],
    public readonly newDefaulters: { name: string, email: string }[],
    public readonly totalDefaulters: number
  ) {
    super();
  }
}