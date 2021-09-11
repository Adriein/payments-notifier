export class Collection<T> {
  constructor(private collection: T[]) {}

  public isEmpty(): boolean {
    return this.collection.length === 0;
  }

  public cut(size: number): this {
    this.collection = this.collection.splice(0, size);    
    return this;
  }

  public get(): T[] {
    return this.collection;
  }
}
