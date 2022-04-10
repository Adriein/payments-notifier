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

  public getBy(fn: (item: T) => boolean): T {
    const result = this.collection.find(fn);

    if (!result) {
      throw new Error('Not found any item');
    }

    return result;
  }

  public upsert(newItem: T, fn: (item: T) => boolean): void {
    try {
      this.getBy(fn);

      for (const [ index, item ] of this.collection.entries()) {
        if (fn(item)) {
          this.collection.splice(index, 1, newItem)
          break;
        }
      }
    } catch (error) {
      this.add(newItem);
    }
  }
}
