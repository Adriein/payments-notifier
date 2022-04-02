import { ApiService } from "../../../Shared/Services/ApiService";
import { FetchTotalClientsResponse } from "./FetchTotalClientsResponse";

export const fetchTotalClients = async (): Promise<number> => {
  const api = ApiService.instance();

  const response = await api.get<FetchTotalClientsResponse>('/client/total');

  return response.data
};