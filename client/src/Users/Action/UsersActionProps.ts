import { Dispatch } from "react";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { FetchUsersActionProps } from "./FetchUsers/FetchUsersActionProps";
import { AddFilterActionProps } from "../../Shared/Action/Filter/AddFilterActionProps";

export interface UsersActionProps {
  fetchUsers: (dispatch: Dispatch<ActionProps>) => ({
    page,
    quantity,
    filters
  }: FetchUsersActionProps) => Promise<void>;

  addFilter: (dispatch: Dispatch<ActionProps>) => ({
    filter
  }: AddFilterActionProps) => void;
}