import { UserStateProps } from "./UserStateProps";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { User } from "../types";
import { resolveAsyncAction } from "../../Shared/Reducers/resolveAsyncActionReducer";

export const fetchUsers = (state: UserStateProps, action: ActionProps): UserStateProps => {
  return {
    ...state,
    ...resolveAsyncAction(),
    users: action.payload as User[]
  };
};