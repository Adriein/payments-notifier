import { ActionProps } from "../../Shared/Action/ActionProps";
import { UserStateProps } from "./UserStateProps";
import { ADD_FILTER_ACTION, FETCH_USERS_ACTION } from "../constants";
import { ASYNC_ACTION } from "../../Shared/constants";
import { fetchUsers } from "./fetchUsersReducer";
import { initAsyncAction } from "../../Shared/Reducers/InitAsyncActionReducer";
import { Filter } from "../types";


const addFilterReducer = (state: UserStateProps, action: ActionProps): UserStateProps => {
  const payload = (action.payload ? action.payload : []) as Filter[];
  return {
    ...state,
    filters: [ ...state.filters, ...payload ]
  };
}

export const usersReducer = (state: UserStateProps, action: ActionProps): UserStateProps => {
  switch (action.type) {
    case ASYNC_ACTION:
      return initAsyncAction(state);
    case FETCH_USERS_ACTION:
      return fetchUsers(state, action);
    case ADD_FILTER_ACTION:
      return addFilterReducer(state, action)
    default:
      return state;
  }
};