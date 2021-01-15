import { IMapper } from '../../../Domain/Interfaces';
import { IRepository } from '../../../Domain/Interfaces/IRepository';
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
    await this.db.query(this.buildInsertQuery(datamodel));
  }

  async update(entity: T): Promise<void> {
    throw new Error();
  }
  async delete(id: string): Promise<void> {
    await this.db.query(`DELETE FROM ${this.entity} WHERE id='${id}' AND subscription_id IS NOT NULL`);
  }

  protected buildInsertQuery(datamodel: any): string {
    return `INSERT INTO ${this.entity} VALUES(${Object.keys(datamodel)
      .map((key) => `${datamodel[key] !== null ? `'${datamodel[key]}'` : null}`)
      .join(',')});`;
  }

  protected buildUpdateQuery(datamodel: any): string {

    return `UPDATE ${this.entity} SET ${Object.keys(datamodel)
      .map((key) => {
        return `${key}=${
          datamodel[key] === null || datamodel[key] === undefined
            ? null
            : `'${datamodel[key]}'`
        }`;
      })
      .join(',')};`;
  }
}
