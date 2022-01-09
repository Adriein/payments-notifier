export interface FetchUsersActionProps {
  page: number;
  quantity: number;
  filters?: UserTableFilter[];
}

export interface UserTableFilter {
  field: 'active' | 'name' | 'expired'
}

