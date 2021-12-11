import { DomainEvent } from '../../../Shared/Domain/Entities/DomainEvent';

export class ApiQueryDomainEvent extends DomainEvent {
  constructor(public readonly aggregateId: string, public readonly adminId: string, public readonly calls: number) {
    super();
  }
}
