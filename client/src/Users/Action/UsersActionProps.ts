import { Dispatch } from "react";
import { ActionProps } from "../../Shared/Action/ActionProps";

export interface UsersActionProps {
  fetchUsers: (dispatch: Dispatch<ActionProps>) => () => Promise<void>;
}