import { Dispatch } from "react";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { FetchUsersActionProps } from "./FetchUsers/FetchUsersActionProps";

export interface UsersActionProps {
  fetchUsers: (dispatch: Dispatch<ActionProps>) => ({
    page,
    quantity,
    filters
  }: FetchUsersActionProps) => Promise<void>;
}