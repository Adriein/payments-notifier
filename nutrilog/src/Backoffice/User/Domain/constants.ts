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

export const USER_ROLE = 'user';

export const ADMIN_ROLE = 'admin';

export const LANG_ES = 'ES';

export const YEARLY_PRICING = 'yearly';