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