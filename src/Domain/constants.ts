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
  like = 'LIKE',
  ilike = 'ILIKE',
}

export const FILES_PATH = `${process.cwd()}/dist/upload`;

export const SUBSCRIPTIONS_TABLE = 'subscriptions';

export const CONFIG_TABLE = 'config';

export const USER_ROLE = 'user';

export const ADMIN_ROLE = 'admin';

export const LANG_ES = 'ES';

export const DEFAULT_WARNING_DAYS = 5;

export const DEFAULT_DELAY_DAYS = 2;

export const DEFAULT_EMAIL_CONTENT = '';

export const DEFAULT_PRICING = {
  mensual: { duration: 30, price: 50 },
  trimestral: { duration: 90, price: 150 },
};

export const DEFAULT_ADMIN_PRICING = { anual: { duration: 365, price: 1000 } };

export const BACKOFFICE_EMAIL = 'adria.claret@gmail.com';

export const CONTACT_DYNAMIC_TEMPLATE = 'd-1a4d9a0041254c23b307526a6bd603ef';

export const REPORT_DYNAMIC_TEMPLATE = 'd-814650db2b274ca09719750200d51609';

export const CLIENT_EMAIL_CONFIG_SUBJECT = 'Información sobre pago';

export const NOTIFICATIONS_EMAIL = 'ivanmfit.notificaciones@gmail.com';

export const ADMIN_EMAIL_CONFIG_SUBJECT = 'Informe sobre impagos';
