import { ActionProps } from "../../Shared/Action/ActionProps";
import { UserStateProps } from "./UserStateProps";
import { User } from "../types";
import { FETCH_USERS_ACTION } from "../constants";
import { ASYNC_ACTION } from "../../Shared/constants";

const initAsyncAction = (state: UserStateProps) => ({ ...state, isLoading: true });
const resolveAsyncAction = () => ({ isLoading: false });

const fetchUsers = (state: UserStateProps, action: ActionProps) => {
  return {
    ...state,
    ...resolveAsyncAction(),
    users: action.payload as User[]
  };
}

export const usersReducer = (state: UserStateProps, action: ActionProps): UserStateProps => {
  switch (action.type) {
    case ASYNC_ACTION:
      return initAsyncAction(state);
    case FETCH_USERS_ACTION:
      return fetchUsers(state, action);
    default:
      return state;
  }
};