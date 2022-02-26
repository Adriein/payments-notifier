import { FetchClientListResponse } from "../types";
import { FilterProps } from "../../Shared/Action/Filter/FilterProps";

export interface UserStateProps {
  isLoading: boolean;
  clientList: FetchClientListResponse[];
  filters: FilterProps[];
  totalUsers: number;
}