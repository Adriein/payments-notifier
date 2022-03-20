import { UserStateProps } from "./UserStateProps";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { resolveAsyncAction } from "../../Shared/Reducers/resolveAsyncActionReducer";

export const fetchTotalClientsReducer = (
  state: UserStateProps,
  action: ActionProps<number>
): UserStateProps => {
  return {
    ...state,
    ...resolveAsyncAction(),
    totalUsers: action.payload ?? 0,
  };
};