import { Filter } from "../../types";

export interface FetchUsersActionProps {
  page: number;
  quantity: number;
  filters?: Filter[];
}

