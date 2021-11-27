import { DomainEvent } from "../../../../Shared/Domain/Entities/DomainEvent";

export class SendExpiredSubscriptionsReportEmailDomainEvent extends DomainEvent {
  constructor(
    public readonly aggregateId: string,
    public readonly totalDefaulters: number,
    public readonly lastReportDate: Date,
    public readonly reportDate: Date,
    public readonly defaulters: { name: string, email: string }[],
    public readonly oldDefaulters: { name: string, email: string }[],
  ) {
    super();
  }
}