import { UserStateProps } from "./UserStateProps";
import { resolveAsyncAction } from "../../Shared/Reducers/resolveAsyncActionReducer";

export const updateClientReducer = (
  state: UserStateProps,
): UserStateProps => {
  return {
    ...state,
    ...resolveAsyncAction()
  };
};