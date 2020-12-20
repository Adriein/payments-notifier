import { IRepository } from '../../domain/interfaces/IRepository';
import Database from './Database';

export class LowDbRepository<T> implements IRepository<T> {
  private db = Database.getInstance().getConnection();

  constructor(protected entity: string) {}

  async findOne(id: string): Promise<T> {
    return this.db
      .get(this.entity)
      .value()
      .find((user: any) => user.name === id);
  }
  async find(searchObj: any): Promise<T[]> {
    return this.db.get(this.entity).value();
  }
  async save(body: T): Promise<T> {
    const collection = this.db.get(this.entity).value().push(body);

    return this.db.update(this.entity, collection).write();
  }
  async update(...args: any[]): Promise<T> {
    throw new Error();
  }
  async delete(id: string): Promise<number> {
    throw new Error();
  }
}
