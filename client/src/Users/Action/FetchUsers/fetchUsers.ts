import { Dispatch } from "react";
import { ApiService } from "../../../Shared/Services/ApiService";
import { ActionProps } from "../../../Shared/Action/ActionProps";
import { FetchUsersApiCall } from "./FetchUsersApiCall";
import { FetchUsersActionProps } from "./FetchUsersActionProps";
import { FETCH_USERS_ACTION } from "../../constants";
import { ASYNC_ACTION } from "../../../Shared/constants";
import { FetchTenantApiResponse, FetchUsersPayload, User } from "../../types";


export const fetchUsers = (dispatch: Dispatch<ActionProps<FetchUsersPayload>>) => {
  return async ({ quantity, page, filters }: FetchUsersActionProps): Promise<void> => {
    dispatch({ type: ASYNC_ACTION });
    const api = ApiService.instance();

    const response = await api.post<FetchUsersApiCall, FetchUsersActionProps>('/users', { quantity, page, filters });

    dispatch({ type: FETCH_USERS_ACTION, payload: { users: response.data, totalUsers: 100 } });
  };
};
