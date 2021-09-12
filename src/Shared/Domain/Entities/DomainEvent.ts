export abstract class DomainEvent {
  public abstract readonly aggregateId: string;

  public readonly dateOccurred = new Date().toUTCString();
}
