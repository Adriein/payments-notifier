export interface IRepository<T> {
  findOne(id: string): Promise<T | undefined>;

  find(adminId: string): Promise<T[]>;

  save(entity: T): Promise<void>;

  update(entity: T): Promise<void>;

  delete(entity: T): Promise<void>;
}
