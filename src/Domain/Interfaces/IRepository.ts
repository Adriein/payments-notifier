import { Criteria } from '../Entities/Criteria.entity';

export interface IRepository<T> {
  findOne(id: string): Promise<T | undefined>;
  find(criteria: Criteria): Promise<T[]>;
  save(body: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}
