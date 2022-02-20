import { DomainEvent } from "../../../../Shared/Domain/Entities/DomainEvent";
import { FindTenantClientsResponse } from "../../../User/Application/FindTenantClients/FindTenantClientsResponse";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";

export class SendExpiredSubscriptionsReportEmailDomainEvent extends DomainEvent {
  constructor(
    public readonly aggregateId: ID,
    public readonly totalDefaulters: number,
    public readonly lastReportDate: Date,
    public readonly reportDate: Date,
    public readonly defaulters: FindTenantClientsResponse[],
    public readonly oldDefaulters: FindTenantClientsResponse[],
  ) {
    super();
  }
}