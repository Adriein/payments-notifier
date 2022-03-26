import { Dispatch } from "react";
import { ActionProps } from "../../../Shared/Action/ActionProps";
import { FetchClientListActionProps } from "../FetchClientList/FetchClientListActionProps";
import { ASYNC_ACTION } from "../../../Shared/constants";
import { ApiService } from "../../../Shared/Services/ApiService";
import { FetchClientListApiCall } from "../FetchClientList/FetchClientListApiCall";
import { fetchTotalClients } from "../FetchTotalClients/fetchTotalClients";
import { FETCH_CLIENT_LIST_ACTION } from "../../constants";

export const updateClient = (dispatch: Dispatch<ActionProps<any>>) => {
  return async ({ quantity, page, filters }: FetchClientListActionProps): Promise<void> => {
    dispatch({ type: ASYNC_ACTION });
    const api = ApiService.instance();

    const response = await api.post<FetchClientListApiCall, FetchClientListActionProps>(
      '/users',
      { quantity, page, filters }
    );

    const totalUsers = await fetchTotalClients();

    dispatch({ type: FETCH_CLIENT_LIST_ACTION, payload: { clientList: response.data, totalUsers } });
  };
};