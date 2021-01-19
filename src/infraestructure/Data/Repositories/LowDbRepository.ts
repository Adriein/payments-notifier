import { IMapper } from '../../../Domain/interfaces';
import { IRepository } from '../../../Domain/interfaces/IRepository';
import { GenericRepository } from './GenericRepository';

export class LowDbRepository<T> extends GenericRepository<T> implements IRepository<T> {
  constructor(protected entity: string, protected mapper: IMapper<T>) {
    super(entity, mapper);
  }

  async findOne(id: string): Promise<T | undefined> {
    throw new Error();
  }
}
