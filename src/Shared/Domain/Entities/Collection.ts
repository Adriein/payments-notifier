export class Collection<T = any> {
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

  public static flat<T>(array: T[][]) {
    const flattenedArray = array.reduce((flat: T[], value: T[]) => {      
      return [...flat, ...value];
    }, []);

    return new Collection<T>(flattenedArray);
  }
}