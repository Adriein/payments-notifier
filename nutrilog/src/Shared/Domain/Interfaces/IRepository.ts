import { Either } from "../types";
import { Criteria } from "../Entities/Criteria";
import { RepositoryFilter } from "../Entities/RepositoryFilter";

export interface IRepository<T> {
  findOne(id: string): Promise<Either<Error, T>>;

  find(criteria: RepositoryFilter): Promise<Either<Error, T[]>>;

  save(entity: T): Promise<void>;

  update(entity: T): Promise<void>;

  delete(entity: T): Promise<void>;
}
