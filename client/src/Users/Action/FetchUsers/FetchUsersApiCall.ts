import { FetchTenantApiResponse } from "../../types";

export interface FetchUsersApiCall {
  data: FetchTenantApiResponse[]
  metadata: { totalUsers: number }
}