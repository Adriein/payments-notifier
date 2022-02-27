import { UserStateProps } from "./UserStateProps";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { FetchClientProfilePayload } from "../types";
import { resolveAsyncAction } from "../../Shared/Reducers/resolveAsyncActionReducer";

export const fetchClientProfileReducer = (
  state: UserStateProps,
  action: ActionProps<FetchClientProfilePayload>
): UserStateProps => {
  return {
    ...state,
    ...resolveAsyncAction(),
    clientProfile: action.payload?.clientProfile ?? undefined,
  };
};