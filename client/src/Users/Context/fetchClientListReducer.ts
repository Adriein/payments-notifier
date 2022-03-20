import { UserStateProps } from "./UserStateProps";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { FetchClientListPayload } from "../types";
import { resolveAsyncAction } from "../../Shared/Reducers/resolveAsyncActionReducer";

export const fetchClientListReducer = (
  state: UserStateProps,
  action: ActionProps<FetchClientListPayload>
): UserStateProps => {
  return {
    ...state,
    ...resolveAsyncAction(),
    clientList: action.payload?.clientList ?? [],
    totalUsers: action.payload?.totalUsers ?? 0,
  };
};