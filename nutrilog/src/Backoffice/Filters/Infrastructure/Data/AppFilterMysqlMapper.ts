import { MysqlMapper } from "../../../../Shared/Infrastructure/Data/MysqlMapper";

export class AppFilterMysqlMapper extends MysqlMapper {
  protected filterableColumnsMapping = {
    entity: {
      field: 'entity',
      type: 'string'
    },
    tenantId: {
      field: 'tenant_id',
      type: 'string'
    }
  }

}