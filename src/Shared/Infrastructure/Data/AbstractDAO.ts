import Database from '../../../Infraestructure/Data/Database';

export abstract class AbstractDAO<T extends object, K extends keyof T = any> {
  protected db: Database = Database.getInstance();

  protected insertQuery = (table: string, entity: T): string => {
    const fields = Reflect.getMetadataKeys(this);
    return `
      INSERT INTO ${table} 
      VALUES(${this.values(entity, fields)});
    `;
  };

  protected selectQuery = (id: string, table: string, relations?: string[]): string => {
    if (relations) {
      const [ tableAlias ] = table.split('');

      return `SELECT ${this.avoidNamingConflicts(relations)}, ${tableAlias}.* FROM ${table} ${tableAlias} ${this.joins(table, relations)} WHERE ${tableAlias}.id = '${id}'`;
    }

    return `SELECT * FROM ${table} WHERE id = '${id}'`;
  };

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

  private values = (entity: T, fields: string[]): string => {
    const extractFromEntity = (key: string) => {
      return `${entity[key as K] !== null ? `'${entity[key as K]}'` : null}`;
    };

    return fields.map(extractFromEntity).join(',');
  };

  public abstract getOne(relations?: string[]): Promise<T | undefined>;
  public abstract find(criteria: any): Promise<T[] | undefined>;
  public abstract save(entity: T): Promise<void>;
  public abstract update(entity: T): Promise<void>;
  public abstract delete(id: string): Promise<void>;
}
