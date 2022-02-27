import { ClientList, User } from "../types";
import { FilterProps } from "../../Shared/Action/Filter/FilterProps";

export interface UserStateProps {
  isLoading: boolean;
  clientList: ClientList[];
  filters: FilterProps[];
  totalUsers: number;
  clientProfile?: User;
}