import { DomainEvent } from "../../../../Shared/Domain/Entities/DomainEvent";
import { GetUserResponse } from "../../../User/Application/Find/GetUserResponse";

export class SendExpiredSubscriptionsReportEmailDomainEvent extends DomainEvent {
  constructor(
    public readonly aggregateId: string,
    public readonly totalDefaulters: number,
    public readonly lastReportDate: Date,
    public readonly reportDate: Date,
    public readonly defaulters: GetUserResponse[],
    public readonly oldDefaulters: GetUserResponse[],
  ) {
    super();
  }
}