import { FilterProps } from "../../../Shared/Action/Filter/FilterProps";


export interface FetchUsersActionProps {
  page: number;
  quantity: number;
  filters?: FilterProps[];
}

