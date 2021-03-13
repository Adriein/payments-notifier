import { Criteria } from '../../../Domain/Entities/Criteria.entity';
import { Filter } from '../../../Domain/Entities/Filter.entity';
import Database from '../Database';

type InformationSchema = {
  table_name: string;
  column_name: string;
  data_type: string;
};

type Hash = { [key: string]: string };

export class CriteriaMapper {
  private db = Database.getInstance().getConnection();

  public async sql(criteria: Criteria, joins?: string[]): Promise<string[]> {
    if (joins) {
      const hash = await this.buildJoinsHash(joins);

      return this.buildSQL(criteria, hash);
    }

    return this.buildSQL(criteria);
  }

  private async buildJoinsHash(joins: string[]): Promise<Hash> {
    return (await joins.reduce(async (acc, table) => {
      return {
        ...(await acc),
        ...(await this.tableSchemaHash(table)),
      };
    }, Promise.resolve({}))) as Hash;
  }

  private async tableSchemaHash(table: string): Promise<Hash> {
    const { rows } = await this.db.query(
      `SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_name = '${table}';`
    );

    return rows.reduce((acc, row: InformationSchema) => {
      return {
        ...acc,
        [row.column_name]: row.table_name,
      };
    }, {});
  }

  private buildSQL(criteria: Criteria, joinsHash?: Hash): string[] {
    if (joinsHash) {
      return criteria.filters.map((filter: Filter) => {          
        return `AND ${
          joinsHash[filter.field]
            ? `${joinsHash[filter.field]}.${filter.field}`
            : filter.field
        } ${filter.operator} '${filter.value}'`;
      });
    }
    return criteria.filters.map(
      (filter: Filter) =>
        `AND ${filter.field} ${filter.operator} '${filter.value}'`
    );
  }
}
