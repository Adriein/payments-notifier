import { Dispatch } from "react";
import { ApiService } from "../../../Shared/Services/ApiService";
import { ActionProps } from "../../../Shared/Action/ActionProps";
import { FETCH_CLIENT_PROFILE_ACTION } from "../../constants";
import { ASYNC_ACTION } from "../../../Shared/constants";
import { FetchClientProfileActionProps } from "./FetchClientProfileActionProps";
import { FetchClientProfilePayload } from "../../types";
import { FetchClientProfileApiCall } from "./FetchClientProfileApiCall";


export const fetchClientProfile = (dispatch: Dispatch<ActionProps<FetchClientProfilePayload>>) => {
  return async ({ clientId }: FetchClientProfileActionProps): Promise<void> => {
    dispatch({ type: ASYNC_ACTION });
    const api = ApiService.instance();

    const response = await api.get<FetchClientProfileApiCall>(`/client/${clientId}/profile`);

    dispatch({ type: FETCH_CLIENT_PROFILE_ACTION, payload: { clientProfile: response.data } });
  };
};
