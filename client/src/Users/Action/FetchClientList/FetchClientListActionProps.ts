import { FilterProps } from "../../../Shared/Action/Filter/FilterProps";


export interface FetchClientListActionProps {
  page: number;
  quantity: number;
  filters?: FilterProps[];
}

