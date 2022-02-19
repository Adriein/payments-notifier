import { BaseEntity } from "./BaseEntity";

export class Collection<T extends BaseEntity> {
  constructor(private collection: T[]) {}

  public isEmpty(): boolean {
    return this.collection.length === 0;
  }

  public cut(size: number): this {
    this.collection = this.collection.splice(0, size);
    return this;
  }

  public data(): T[] {
    return this.collection;
  }

  public size(): number {
    return this.collection.length;
  }

  public add(item: T): this {
    this.collection.push(item)
    return this;
  }
}
