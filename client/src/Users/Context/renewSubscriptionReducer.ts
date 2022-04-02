import { UserStateProps } from "./UserStateProps";
import { resolveAsyncAction } from "../../Shared/Reducers/resolveAsyncActionReducer";

export const renewSubscriptionReducer = (
  state: UserStateProps,
): UserStateProps => {
  return {
    ...state,
    ...resolveAsyncAction()
  };
};