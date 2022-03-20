import { ApiService } from "../../../Shared/Services/ApiService";
import { FetchTotalClientsApiCall } from "./FetchTotalClientsApiCall";

export const fetchTotalClients = async (): Promise<number> => {
  const api = ApiService.instance();

  const response = await api.get<FetchTotalClientsApiCall>('/client/total');

  return response.data
};