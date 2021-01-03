import { IMapper } from '../../../domain/interfaces';
import { IRepository } from '../../../domain/interfaces/IRepository';
import Database from '../Database';

export abstract class GenericRepository<T> implements IRepository<T> {
  protected db = Database.getInstance().getConnection();

  constructor(protected entity: string, protected mapper: IMapper<T>) {}

  async findOne(id: string): Promise<T | undefined> {
    throw new Error();
  }
  async find(searchObj: any): Promise<T[]> {
    throw new Error();
  }
  async save(entity: T): Promise<void> {
    const datamodel = this.mapper.datamodel(entity);
    await this.db.query(
      `INSERT INTO ${this.entity} VALUES(${Object.keys(datamodel)
        .map(
          (key) => `${datamodel[key] !== null ? `'${datamodel[key]}'` : null}`
        )
        .join(',')})`
    );
  }

  async update(entity: T): Promise<void> {
    throw new Error();
  }
  async delete(id: string): Promise<void> {
    throw new Error();
  }
}
