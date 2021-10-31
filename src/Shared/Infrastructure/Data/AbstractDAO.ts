import Database from '../../../Infraestructure/Data/Database';
import { Criteria } from "../../Domain/Entities/Criteria";
import { ConstructorFunc, JSObject, MetadataRelation } from "../../Domain/types";
import { QueryBuilder } from "./QueryBuilder";
import { TABLE_FIELD_METADATA, TABLE_NAME_METADATA, TABLE_RELATION_METADATA } from "../../Domain/constants";
import { OPERATORS } from "../../../Domain/constants";
import { StringUtils } from "../../Domain/Helper/String.utils";

interface HasID {
  id?: string;
}

export abstract class AbstractDAO<T extends HasID, K extends keyof T = any> {
  private table: string = Reflect.getMetadata(TABLE_NAME_METADATA, this.constructor);
  private prefix: string = this.getPrefix(this.table);
  private relations: MetadataRelation[] = this.getEntityRelations();

  protected db: Database = Database.getInstance();

  private getEntityValues(entity: T): (field: string) => string {
    return (field: string) => {
      const value = entity[field as K] ?? null;

      if (typeof value === 'number') {
        return `${value}`
      }
      return `'${value}'`
    };
  }

  private getUpdateValues(entity: T): (field: string) => string[] {
    return (field: string) => {
      const value = entity[field as K] ?? null;

      if (typeof value === 'number') {
        return [ field, `${value}` ];
      }

      return [ field, `'${value}'` ]
    };
  }


  protected buildDAO(Dao: ConstructorFunc, result: JSObject): T {
    const dao = new Dao();
    const fields = this.getEntityFields(dao);
    const relations = this.getEntityRelations(dao);

    fields.forEach((field: string) => dao[field] = result[`${dao.prefix}_${field}`]);
    relations.forEach((metadata: MetadataRelation) => {
      dao[metadata.prop] = this.buildDAO(metadata.dao, result);
    });

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
    console.log(rows);
    if (!rows.length) {
      return undefined;
    }

    return this.buildDAO(this.constructor as ConstructorFunc, rows[0])
  }

  public async find(criteria: Criteria): Promise<T[]> {
    const qb = new QueryBuilder(this.prefix);
    qb.select().from(this.table);

    for (const [ field, { equality, operation } ] of criteria.storage.entries()) {
      if (operation === OPERATORS.equal) {
        qb.where(StringUtils.toSnakeCase(field), equality);
      }
    }

    if (this.relations.length) {
      qb.leftJoin(this.relations);

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

  protected async update(entity: T): Promise<void> {
    const qb = new QueryBuilder(this.prefix);
    const values = this.getEntityFields().map(this.getUpdateValues(entity));

    const query = qb.update(this.table).set(values).where('id', entity.id!).toQuery();
    await this.db.getConnection().query(query);
  }

  public delete(id: string): Promise<void> {
    throw new Error();
  }

  private getEntityRelations(constructorFn: any = this): MetadataRelation[] {
    const relationMetadata = Reflect.getMetadata(TABLE_RELATION_METADATA, constructorFn);

    if (!relationMetadata?.length) {
      return [];
    }

    return relationMetadata.map(this.buildReferencedTablePrefix.bind(this));
  }

  private getEntityFields(constructorFn: any = this): string[] {
    return Reflect.getMetadata(TABLE_FIELD_METADATA, constructorFn);
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
