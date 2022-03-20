import { ActionProps } from "../../Shared/Action/ActionProps";
import { UserStateProps } from "./UserStateProps";
import { FETCH_CLIENT_LIST_ACTION, FETCH_CLIENT_PROFILE_ACTION, FETCH_TOTAL_CLIENTS_ACTION } from "../constants";
import { ADD_FILTER_ACTION, ASYNC_ACTION } from "../../Shared/constants";
import { fetchClientListReducer } from "./fetchClientListReducer";
import { initAsyncAction } from "../../Shared/Reducers/InitAsyncActionReducer";
import { addFilterReducer } from "../../Shared/Reducers/addFilterReducer";
import { FetchClientListPayload, FetchClientProfilePayload } from "../types";
import { FilterProps } from "../../Shared/Action/Filter/FilterProps";
import { fetchClientProfileReducer } from "./fetchClientProfileReducer";
import { fetchTotalClientsReducer } from "./fetchTotalClientsReducer";


export const usersReducer = (state: UserStateProps, action: ActionProps): UserStateProps => {
  switch (action.type) {
    case ASYNC_ACTION:
      return initAsyncAction(state);
    case FETCH_CLIENT_LIST_ACTION:
      return fetchClientListReducer(state, action as ActionProps<FetchClientListPayload>);
    case ADD_FILTER_ACTION:
      return addFilterReducer(state, action as ActionProps<FilterProps>);
    case FETCH_CLIENT_PROFILE_ACTION:
      return fetchClientProfileReducer(state, action as ActionProps<FetchClientProfilePayload>);
    case FETCH_TOTAL_CLIENTS_ACTION:
      return fetchTotalClientsReducer(state, action as ActionProps<number>)
    default:
      return state;
  }
};