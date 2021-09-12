import { AggregateRoot } from './AggregateRoot';
import { DomainEvent } from './DomainEvent';

export interface EventHandler {
  subscribeTo(event: DomainEvent): void;
}

export type EventCallback = (event: DomainEvent) => Promise<void>;

type EventName = string;

type DomainEventClass = new (...args: never[]) => DomainEvent;

export abstract class DomainEventsManager {
  private static subscribers: Map<EventName, EventCallback[]> = new Map();

  private static aggregates: AggregateRoot[] = [];

  public static subscribe<T extends DomainEvent>(
    event: DomainEventClass,
    callback: (event: T) => Promise<void>
  ): void {
    const eventName: EventName = event.name;
    if (!this.subscribers.has(eventName)) {
      this.subscribers.set(eventName, []);
    }
    this.subscribers.get(eventName)?.push(callback as EventCallback);
  }

  public static prepareForPublish(aggregate: AggregateRoot): void {
    const aggregateFound = !!this.findAggregateByID(aggregate.id());
    if (!aggregateFound) {
      this.aggregates.push(aggregate);
    }
  }

  public static async publishEvents(id: string): Promise<void> {
    const aggregate = this.findAggregateByID(id);

    if (aggregate) {
      await Promise.all(
        aggregate.domainEvents().map((event: DomainEvent) => {
          return this.publish(event);
        })
      );
      aggregate.clearEvents();
      this.removeAggregateFromPublishList(aggregate);
    }
  }

  private static findAggregateByID(id: string): AggregateRoot | undefined {
    return this.aggregates.find(
      (aggregate: AggregateRoot) => aggregate.id() === id
    );
  }

  private static removeAggregateFromPublishList(
    aggregate: AggregateRoot
  ): void {
    this.aggregates = this.aggregates.filter((aggr: AggregateRoot) => {
      return aggr.id() !== aggregate.id();
    });
  }

  private static async publish(event: DomainEvent): Promise<void> {
    const eventName: string = event.constructor.name;

    if (this.subscribers.has(eventName)) {
      const callbacks: EventCallback[] = this.subscribers.get(eventName) || [];
      await Promise.all(callbacks.map((callback) => callback(event)));
    }
  }
}
