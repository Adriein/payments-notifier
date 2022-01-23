import { UserStateProps } from "./UserStateProps";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { FetchUsersPayload } from "../types";
import { resolveAsyncAction } from "../../Shared/Reducers/resolveAsyncActionReducer";

export const fetchUsersReducer = (
  state: UserStateProps,
  action: ActionProps<FetchUsersPayload>
): UserStateProps => {
  return {
    ...state,
    ...resolveAsyncAction(),
    users: action.payload?.users ? action.payload.users : [],
    totalUsers: action.payload?.totalUsers ? action.payload.totalUsers : 0,
  };
};