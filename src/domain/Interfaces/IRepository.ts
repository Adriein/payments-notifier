export interface IRepository<T> {
    findOne(id: string): Promise<T | undefined>;
    find(searchObj: any): Promise<T[]>;
    save(body: T): Promise<void>;
    update(entity: T): Promise<void>;
    delete(id: string): Promise<number>;
  }
  