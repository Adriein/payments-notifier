import { UserStateProps } from "./UserStateProps";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { User } from "../types";
import { resolveAsyncAction } from "../../Shared/Reducers/resolveAsyncActionReducer";

export const fetchUsersReducer = (state: UserStateProps, action: ActionProps<User[]>): UserStateProps => {
  return {
    ...state,
    ...resolveAsyncAction(),
    users: action.payload ? action.payload : []
  };
};