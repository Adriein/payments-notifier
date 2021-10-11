import Database from '../../../Infraestructure/Data/Database';
import { Criteria } from "../../Domain/Entities/Criteria";
import { ConstructorFunc, JSObject } from "../../Domain/types";

interface HasID {
  id?: string;
}

export abstract class AbstractDAO<T extends HasID, K extends keyof T = any> {
  protected db: Database = Database.getInstance();

  protected insertQuery = (entity: T): string => {
    const fields = this.getEntityFields();
    return `
        INSERT INTO ${this.table}
        VALUES (${this.valuesToInsert(entity, fields)});
    `;
  };

  protected updateQuery = (entity: T) => {
    const fields = this.getEntityFields();

    if (!entity.id) {
      throw new Error('The entity you are trying to update has no id');
    }

    return `
        UPDATE ${this.table}
        SET ${this.valuesToUpdate(entity, fields)}
        WHERE ${this.getPrefix()}_id = '${entity.id}';
    `;
  }

  protected selectQuery = (id: string, relations?: string[]): string => {
    if (relations) {
      const [ tableAlias ] = this.table.split('');

      return `
          SELECT ${this.avoidNamingConflicts(relations)}, ${tableAlias}.*
          FROM ${this.table} ${tableAlias} ${this.joins(this.table, relations)}
          WHERE ${tableAlias}.id = '${id}';
      `;
    }

    return `
        SELECT *
        FROM ${this.table}
        WHERE id = '${id}';
    `;
  };

  protected findQuery(criteria: Criteria): string {
    return `SELECT *
            FROM ${this.table} ${criteria.toQuery(this.getPrefix())}`;
  }

  private joins = (table: string, relations: string[]): string => {
    return relations
      .map((relation: string) => {
        const [ tableAlias ] = table.split('');

        return `LEFT JOIN ${relation} ${relation} ON ${tableAlias}.id = ${relation}.${table}_id`;
      })
      .join('');
  };

  private avoidNamingConflicts = (relations: string[]): string => {
    return relations.map((relation: string) => {
      return `${relation}.id as ${relation}_id, ${relation}.created_at as ${relation}_created_at, ${relation}.updated_at as ${relation}_updated_at, ${relation}.*`;
    }).join('');
  }

  private valuesToInsert = (entity: T, fields: string[]): string => {
    return fields.map(this.getEntityValues(entity)).join(',');
  };

  private valuesToUpdate = (entity: T, fields: string[]): string => {
    return fields.map(this.updateStatement(entity)).join(',');
  }

  private getEntityValues(entity: T): (field: string) => string {
    return (field: string) => {
      const value = entity[field as K] ?? null;

      if (typeof value === 'number') {
        return `${value}`
      }
      return `'${value}'`
    };
  }

  private updateStatement(entity: T) {
    const prefix = this.getPrefix();
    return (field: string) => {
      return `${prefix}_${field}='${entity[field as K]}'`
    }
  }

  protected getEntityFields(): string[] {
    return Reflect.getMetadataKeys(this);
  }

  protected getPrefix(): string {
    const tablename = this.table.split('_');
    return tablename.reduce((prefix: string, word: string) => `${prefix}${word.split('').slice(0, 2).join('')}`, '');
  }

  protected buildDAO(Dao: ConstructorFunc, result: JSObject): T {
    const dao = new Dao();
    const fields = this.getEntityFields();
    const prefix = this.getPrefix();

    fields.forEach((field: string) => dao[field] = result[`${prefix}_${field}`]);

    return dao;
  }

  protected abstract table: string;

  public abstract getOne(relations?: string[]): Promise<T | undefined>;

  public abstract find(criteria: Criteria, relations?: string[]): Promise<T[] | undefined>;

  public abstract save(): Promise<void>;

  public abstract update(): Promise<void>;

  public abstract delete(id: string): Promise<void>;
}
