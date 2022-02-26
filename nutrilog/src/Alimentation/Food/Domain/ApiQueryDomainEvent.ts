import { DomainEvent } from '../../../Shared/Domain/Entities/DomainEvent';
import { ID } from "../../../Shared/Domain/VO/Id.vo";

export class ApiQueryDomainEvent extends DomainEvent {
  constructor(public readonly aggregateId: ID, public readonly adminId: string, public readonly calls: number) {
    super();
  }
}
