import { Criteria } from '../../../Domain/Entities/Criteria.entity';

export interface IRepository<T> {
  findOne(id: string): Promise<T | undefined>;
  find(adminId: string, criteria: Criteria): Promise<T[]>;
  save(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}
