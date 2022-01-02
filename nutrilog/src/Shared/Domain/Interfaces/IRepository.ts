import { Either } from "../types";
import { Criteria } from "../Entities/Criteria";

export interface IRepository<T> {
  findOne(id: string): Promise<Either<Error, T>>;

  find(criteria: Criteria<any>): Promise<Either<Error, T[]>>;

  save(entity: T): Promise<void>;

  update(entity: T): Promise<void>;

  delete(entity: T): Promise<void>;
}
