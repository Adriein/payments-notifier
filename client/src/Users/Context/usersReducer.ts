import { ActionProps } from "../../Shared/Action/ActionProps";
import { FETCH_USERS_ACTION } from "../constants";
import { UserStateProps } from "./UserStateProps";

export const usersReducer = (state: UserStateProps, action: ActionProps): UserStateProps => {
  switch (action.type) {
    case FETCH_USERS_ACTION:
      return { ...state, users: action.payload as any[] };
    default:
      return state;
  }
};