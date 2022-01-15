import { Filter, User } from "../types";

export interface UserStateProps {
  isLoading: boolean;
  users: User[];
  filters: Filter[];
}