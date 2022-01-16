import { ActionProps } from "../../Shared/Action/ActionProps";
import { UserStateProps } from "./UserStateProps";
import { FETCH_USERS_ACTION } from "../constants";
import { ADD_FILTER_ACTION, ASYNC_ACTION } from "../../Shared/constants";
import { fetchUsersReducer } from "./fetchUsersReducer";
import { initAsyncAction } from "../../Shared/Reducers/InitAsyncActionReducer";
import { addFilterReducer } from "../../Shared/Reducers/addFilterReducer";
import { User } from "../types";
import { FilterProps } from "../../Shared/Action/Filter/FilterProps";


export const usersReducer = (state: UserStateProps, action: ActionProps): UserStateProps => {
  switch (action.type) {
    case ASYNC_ACTION:
      return initAsyncAction(state);
    case FETCH_USERS_ACTION:
      return fetchUsersReducer(state, action as ActionProps<User[]>);
    case ADD_FILTER_ACTION:
      return addFilterReducer(state, action as ActionProps<FilterProps>)
    default:
      return state;
  }
};