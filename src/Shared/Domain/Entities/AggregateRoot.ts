import { BaseEntity } from '../../../Domain/Entities/BaseEntity';
import { DomainEvent } from './DomainEvent';
import { DomainEventsManager } from './DomainEventsManager';

export abstract class AggregateRoot extends BaseEntity {
  private _domainEvents: DomainEvent[] = [];

  public domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEventsManager.prepareForPublish(this);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
