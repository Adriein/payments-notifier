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

  private values = (entity: T, fields: string[]): string => {
    const extractFromEntity = (key: string) => {
      return `${entity[key as K] !== null ? `'${entity[key as K]}'` : null}`;
    };

    return Object.keys(entity).map(extractFromEntity).join(',');
  };

  public abstract getOne(id: string): Promise<T | undefined>;
  public abstract find(criteria: any): Promise<T[] | undefined>;
  public abstract save(entity: T): Promise<void>;
  public abstract update(entity: T): Promise<void>;
  public abstract delete(id: string): Promise<void>;
}
