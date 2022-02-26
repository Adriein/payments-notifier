import { MysqlMapper } from "../../../../Shared/Infrastructure/Data/MysqlMapper";

export class UserMysqlMapper extends MysqlMapper {
  protected filterableColumnsMapping = {
    tenantId: {
      field: 'owner_id',
      type: 'string'
    },
    email: {
      field: 'email',
      type: 'string'
    },
    sendWarnings: {
      field: 'config.send_warnings',
      type: 'boolean'
    },
    roleId: {
      field: 'role_id',
      type: 'string'
    },
    active: {
      field: 'active',
      type: 'string'
    },
    name: {
      field: 'username',
      type: 'string'
    }
  };
}