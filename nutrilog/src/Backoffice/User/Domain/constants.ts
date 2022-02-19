export enum USER_FILTERS {
  ACTIVE = 'active',
  NAME = 'name',
  EXPIRED = 'expired'
}

export type UserFilters = {
  active: boolean;
  name: string;
  expired: boolean;
}

export const CLIENT_ROLE = 'client';

export const ADMIN_ROLE = 'admin';

export const TENANT_ROLE = 'tenant';

export const LANG_ES = 'ES';

export const YEARLY_PRICING = 'yearly';

export enum SUBSCRIPTION_STATUS {
  CREATED = 'created',
  EXPIRED = 'expired',
  ABOUT_TO_EXPIRE = 'about_to_expire',
  INACTIVE = 'inactive'
}