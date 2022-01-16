import { Dispatch } from "react";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { FetchUsersActionProps } from "./FetchUsers/FetchUsersActionProps";
import { FilterProps } from "../../Shared/Action/Filter/FilterProps";

export interface UsersActionProps {
  fetchUsers: (dispatch: Dispatch<ActionProps>) => ({
    page,
    quantity,
    filters
  }: FetchUsersActionProps) => Promise<void>;

  addFilter: (dispatch: Dispatch<ActionProps>) => (filter: FilterProps) => void;
}