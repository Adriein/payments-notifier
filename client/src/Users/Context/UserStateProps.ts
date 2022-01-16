import { User } from "../types";
import { FilterProps } from "../../Shared/Action/Filter/FilterProps";

export interface UserStateProps {
  isLoading: boolean;
  users: User[];
  filters: FilterProps[];
}