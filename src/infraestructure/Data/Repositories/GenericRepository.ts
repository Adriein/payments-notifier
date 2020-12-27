import { IMapper } from '../../../domain/interfaces';
import { IRepository } from '../../../domain/interfaces/IRepository';
import Database from '../Database';

export abstract class GenericRepository<T> implements IRepository<T> {
  protected db = Database.getInstance().getConnection();

  constructor(protected entity: string, protected mapper: IMapper<T>) {}

  async findOne(id: string): Promise<T | undefined> {
    const entity = this.db
      .get(this.entity)
      .value()
      .find((entity: any) => entity.id === id);

    if (!entity) {
      return;
    }

    return this.mapper.domain(entity);
  }
  async find(searchObj: any): Promise<T[]> {
    const entities = this.db.get(this.entity).value();
    return entities.map((entity: any) => this.mapper.domain(entity));
  }
  async save(entity: T): Promise<void> {
    const datamodel = this.mapper.datamodel(entity);
    // @ts-ignore
    this.db.get(this.entity).push(datamodel).write();
  }

  async update(entity: T): Promise<void> {
    const datamodel = this.mapper.datamodel(entity);
    this.db
      .get(this.entity)
      // @ts-ignore
      .remove({ id: datamodel.id })
      .write();

    // @ts-ignore
    this.db.get(this.entity).push(datamodel).write();
  }
  async delete(id: string): Promise<void> {
    this.db
      .get(this.entity)
      // @ts-ignore
      .remove({ id })
      .write();
  }
}
