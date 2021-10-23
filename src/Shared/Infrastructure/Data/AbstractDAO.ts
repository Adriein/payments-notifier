import Database from '../../../Infraestructure/Data/Database';
import { Criteria } from "../../Domain/Entities/Criteria";
import { ConstructorFunc, JSObject, MetadataRelation } from "../../Domain/types";
import { QueryBuilder } from "./QueryBuilder";
import { TABLE_FIELD_METADATA, TABLE_NAME_METADATA, TABLE_RELATION_METADATA } from "../../Domain/constants";
import { UserDAO } from "../../../Users/Infrastructure/Data/User.dao";
import { OPERATORS } from "../../../Domain/constants";

interface HasID {
  id?: string;
}

export abstract class AbstractDAO<T extends HasID, K extends keyof T = any> {
  private table: string = Reflect.getMetadata(TABLE_NAME_METADATA, this.constructor);
  private prefix: string = this.getPrefix(this.table);
  private relations: MetadataRelation[] = this.getEntityRelations();

  protected db: Database = Database.getInstance();

  /*
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


   private valuesToUpdate = (entity: T, fields: string[]): string => {
   return fields.map(this.updateStatement(entity)).join(',');
   }*/

  private getEntityValues(entity: T): (field: string) => string {
    return (field: string) => {
      const value = entity[field as K] ?? null;

      if (typeof value === 'number') {
        return `${value}`
      }
      return `'${value}'`
    };
  }

  /*private updateStatement(entity: T) {
   const prefix = this.getPrefix();
   return (field: string) => {
   return `${prefix}_${field}='${entity[field as K]}'`
   }
   }*/


  protected buildDAO(Dao: ConstructorFunc, result: JSObject): T {
    const dao = new Dao();
    const fields = this.getEntityFields();

    fields.forEach((field: string) => dao[field] = result[`${this.prefix}_${field}`]);

    return dao;
  }


  protected async getOne(id: string, lazy: boolean = false): Promise<T | undefined> {
    const qb = new QueryBuilder(this.prefix);

    if (lazy) {
      const query = qb.select().from(this.table).where('id', id).toQuery();

      const { rows } = await this.db.getConnection().query(query);

      if (!rows.length) {
        return undefined;
      }

      return this.buildDAO(this.constructor as ConstructorFunc, rows[0])

    }

    const query = qb.select().from(this.table).leftJoin(this.relations).where('id', id).toQuery();

    const { rows } = await this.db.getConnection().query(query);

    if (!rows.length) {
      return undefined;
    }

    return this.buildDAO(this.constructor as ConstructorFunc, rows[0])
  }

  public async find(criteria: Criteria): Promise<T[]> {
    const qb = new QueryBuilder(this.prefix);
    qb.select().from(this.table);

    if (this.relations.length) {
      qb.leftJoin(this.relations);

      for (const [ field, operations ] of criteria.storage.entries()) {

      }
      criteria.storage.forEach((criteria: Criteria) => {
        if (criteria.getOperation() === OPERATORS.equal) {
          qb.where(criteria.getField(), criteria.getEquality());
        }
      });
    }

    const { rows } = await this.db.getConnection().query(qb.toQuery());

    if (!rows) {
      return [];
    }

    return rows.map((row: any) => this.buildDAO(this.constructor as ConstructorFunc, row));
  }

  protected async save(entity: T): Promise<void> {
    const qb = new QueryBuilder(this.prefix);
    const values = this.getEntityFields().map(this.getEntityValues(entity));

    const query = qb.insert(this.table).values(values).toQuery();

    await this.db.getConnection().query(query);
  }

  public abstract update(): Promise<void>;

  public abstract delete(id: string): Promise<void>;

  private getEntityRelations(): MetadataRelation[] {
    const relationMetadata = Reflect.getMetadata(TABLE_RELATION_METADATA, this);

    if (!relationMetadata?.length) {
      return [];
    }

    return relationMetadata.map(this.buildReferencedTablePrefix.bind(this));
  }

  private getEntityFields(): string[] {
    return Reflect.getMetadata(TABLE_FIELD_METADATA, this);
  }

  private getPrefix(table: string): string {
    const tablename = table.split('_');
    return tablename.reduce((prefix: string, word: string) => `${prefix}${word.split('').slice(0, 2).join('')}`, '');
  }

  private buildReferencedTablePrefix(metadata: MetadataRelation): MetadataRelation {
    return {
      ...metadata,
      refPropName: `${this.getPrefix(metadata.refTable)}_${metadata.refPropName}`
    }
  }
}
