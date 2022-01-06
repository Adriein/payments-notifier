import { Dispatch } from "react";
import { ApiService } from "../../../Shared/Services/ApiService";
import { ActionProps } from "../../../Shared/Action/ActionProps";
import { FetchUsersApiCall } from "./FetchUsersApiCall";
import { FetchUsersActionProps } from "./FetchUsersActionProps";
import { FETCH_USERS_ACTION } from "../../constants";
import { User } from "../../types";

export const fetchUsers = (dispatch: Dispatch<ActionProps<User[]>>) => {
  return async ({ quantity, page, filters }: FetchUsersActionProps): Promise<void> => {
    const api = ApiService.instance();

    const response = await api.post<FetchUsersApiCall, FetchUsersActionProps>('/users', { quantity, page, filters });
    console.log(response);
    dispatch({ type: FETCH_USERS_ACTION, payload: response.users });
  };
};