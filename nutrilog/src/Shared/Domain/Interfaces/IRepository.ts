import { Either } from "../types";

export interface IRepository<T> {
  findOne(id: string): Promise<Either<Error, T>>;

  find(adminId: string): Promise<Either<Error, T[]>>;

  save(entity: T): Promise<void>;

  update(entity: T): Promise<void>;

  delete(entity: T): Promise<void>;
}
