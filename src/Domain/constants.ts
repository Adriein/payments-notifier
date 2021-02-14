export enum PricingType {
  DURATION = 'duration',
  PRICE = 'price',
}

export enum ActivityType {
  low = 'low',
  moderate = 'moderate',
  high = 'high',
}

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

export const FILES_PATH = `${process.cwd()}/dist/upload`;

export const SUBSCRIPTIONS_TABLE = 'subscriptions';

export const CONFIG_TABLE = 'config';

export const USER_ROLE = 'user';

export const LANG_ES = 'ES';

export const DEFAULT_WARNING_DAYS = 5;

export const DEFAULT_DELAY_DAYS = 2;

export const DEFAULT_EMAIL_CONTENT = '';

export const DEFAULT_PRICING = {
  monthly: { duration: 30, price: 50 },
  quarterly: { duration: 90, price: 150 },
};
