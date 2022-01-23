import { User } from "../../types";

export interface FetchUsersApiCall {
  data: User[]
  metadata: { totalUsers: number }
}