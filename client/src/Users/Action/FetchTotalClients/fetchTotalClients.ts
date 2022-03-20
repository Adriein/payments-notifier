import { Dispatch } from "react";
import { ActionProps } from "../../../Shared/Action/ActionProps";
import { ASYNC_ACTION } from "../../../Shared/constants";
import { ApiService } from "../../../Shared/Services/ApiService";
import { FETCH_TOTAL_CLIENTS_ACTION } from "../../constants";
import { FetchTotalClientsApiCall } from "./FetchTotalClientsApiCall";

export const fetchTotalClients = (dispatch: Dispatch<ActionProps<number>>) => {
  return async (): Promise<void> => {
    dispatch({ type: ASYNC_ACTION });
    const api = ApiService.instance();

    const response = await api.get<FetchTotalClientsApiCall>('/client/total');

    dispatch({ type: FETCH_TOTAL_CLIENTS_ACTION, payload: response.data });
  };
};