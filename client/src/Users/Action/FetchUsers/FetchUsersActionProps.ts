export interface FetchUsersActionProps {
  page: number;
  quantity: number;
  filters?: Filter[];
}

interface Filter {
  field: 'active' | 'name' | 'expired'
}

