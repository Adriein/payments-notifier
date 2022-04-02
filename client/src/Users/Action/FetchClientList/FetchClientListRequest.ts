import { FilterProps } from "../../../Shared/Action/Filter/FilterProps";


export interface FetchClientListRequest {
  page: number;
  quantity: number;
  filters?: FilterProps[];
}

