export enum PricingType {
  quarterly = 'trimestral',
  monthly = 'mensual',
}

export enum ActivityType {
  low = 'low',
  moderate = 'moderate',
  high = 'high',
}

export const FILES_PATH = `${process.cwd()}/dist/upload`;

export const SUBSCRIPTIONS_TABLE = 'subscriptions';

export const CONFIG_TABLE = 'config';

export const USER_ROLE = 'user';

export const LANG_ES = 'ES';

export enum OPERATORS {
  equal = '=',
  gt = '>',
  lt = '<',
  gte = '>=',
  lte = '<=',
  ne = '!=',
  and = 'AND',
  or = 'OR',
}
