import { DomainEvent } from '../../../Shared/Domain/Entities/DomainEvent';

export class ApiQueryDomainEvent extends DomainEvent {
  constructor(public readonly aggregateId: string, public readonly userId: string, public readonly calls: number) {
    super();
  }
}
