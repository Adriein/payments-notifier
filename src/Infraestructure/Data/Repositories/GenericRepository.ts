import { Log } from '../../../Domain/Decorators/Log';
import { IMapper } from '../../../Domain/Interfaces';
import { IRepository } from '../../../Domain/Interfaces/IRepository';
import Database from '../Database';
import { CriteriaMapper } from '../Mappers/CriteriaMapper';

export abstract class GenericRepository<T> implements IRepository<T> {
  protected db = Database.getInstance().getConnection();

  constructor(
    protected entity: string,
    protected mapper: IMapper<T>,
    protected criteriaMapper: CriteriaMapper
  ) {}

  @Log(process.env.LOG_LEVEL)
  async findOne(id: string): Promise<T | undefined> {
    const { rows } = await this.db.query(
      `SELECT * FROM ${this.entity} WHERE id='${id}'`
    );
    if (rows.length < 1) {
      return undefined;
    }

    return this.mapper.domain(rows[0]);
  }

  @Log(process.env.LOG_LEVEL)
  async find(adminId: string, searchObj: any): Promise<T[]> {
    throw new Error();
  }

  @Log(process.env.LOG_LEVEL)
  async save(entity: T): Promise<void> {
    const datamodel = this.mapper.datamodel(entity);
    await this.db.query(this.buildInsertQuery(datamodel));
  }

  @Log(process.env.LOG_LEVEL)
  async update(entity: T): Promise<void> {
    const datamodel = this.mapper.datamodel(entity);
    await this.db.query(this.buildUpdateQuery(datamodel));
  }

  @Log(process.env.LOG_LEVEL)
  async delete(id: string): Promise<void> {
    await this.db.query(
      `DELETE FROM ${this.entity} WHERE id='${id}' AND subscription_id IS NOT NULL`
    );
  }

  protected buildInsertQuery(datamodel: any): string {
    return `INSERT INTO ${this.entity} VALUES(${Object.keys(datamodel)
      .map((key) => `${datamodel[key] !== null ? `'${datamodel[key]}'` : null}`)
      .join(',')});`;
  }

  protected buildUpdateQuery(datamodel: any): string {
    const query = [];
    for (const key of Object.keys(datamodel)) {
      if (key.toLowerCase() === 'id') continue;

      query.push(
        `${key}=${
          datamodel[key] === null || datamodel[key] === undefined
            ? null
            : `'${datamodel[key]}'`
        }`
      );
    }

    return `UPDATE ${this.entity} SET ${query.join(',')}`;
  }
}
