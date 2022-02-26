import { Dispatch } from "react";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { FetchClientListActionProps } from "./FetchClientList/FetchClientListActionProps";
import { FilterProps } from "../../Shared/Action/Filter/FilterProps";

export interface UsersActionProps {
  fetchClientList: (dispatch: Dispatch<ActionProps>) => ({
    page,
    quantity,
    filters
  }: FetchClientListActionProps) => Promise<void>;

  addFilter: (dispatch: Dispatch<ActionProps>) => (filter: FilterProps) => void;
}