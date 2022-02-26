import { MysqlMapper } from "../../../../Shared/Infrastructure/Data/MysqlMapper";

export class SubscriptionMysqlMapper extends MysqlMapper {
  protected filterableColumnsMapping = {
    userId: {
      field: 'user_id',
      type: 'string'
    },
    pricingId: {
      field: 'pricing_id',
      type: 'string'
    },
    isActive: {
      field: 'active',
      type: 'boolean'
    },
    isExpired: {
      field: 'expired',
      type: 'boolean'
    }
  };
}