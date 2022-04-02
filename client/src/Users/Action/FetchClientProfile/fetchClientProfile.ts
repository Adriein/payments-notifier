import { Dispatch } from "react";
import { ApiService } from "../../../Shared/Services/ApiService";
import { ActionProps } from "../../../Shared/Action/ActionProps";
import { FETCH_CLIENT_PROFILE_ACTION } from "../../constants";
import { ASYNC_ACTION } from "../../../Shared/constants";
import { FetchClientProfileRequest } from "./FetchClientProfileRequest";
import { FetchClientProfilePayload } from "../../types";
import { FetchClientProfileResponse } from "./FetchClientProfileResponse";


export const fetchClientProfile = (dispatch: Dispatch<ActionProps<FetchClientProfilePayload>>) => {
  return async ({ clientId }: FetchClientProfileRequest): Promise<void> => {
    dispatch({ type: ASYNC_ACTION });
    const api = ApiService.instance();

    const response = await api.get<FetchClientProfileResponse>(`/client/${clientId}/profile`);

    dispatch({ type: FETCH_CLIENT_PROFILE_ACTION, payload: { clientProfile: response.data } });
  };
};
