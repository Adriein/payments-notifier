import { DomainEvent } from "../../../../Shared/Domain/Entities/DomainEvent";
import { FindUserResponse } from "../../../User/Application/Find/FindUserResponse";

export class SendExpiredSubscriptionsReportEmailDomainEvent extends DomainEvent {
  constructor(
    public readonly aggregateId: string,
    public readonly totalDefaulters: number,
    public readonly lastReportDate: Date,
    public readonly reportDate: Date,
    public readonly defaulters: FindUserResponse[],
    public readonly oldDefaulters: FindUserResponse[],
  ) {
    super();
  }
}