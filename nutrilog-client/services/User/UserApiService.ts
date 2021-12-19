import { ApiService } from "../ApiService";
import { UserProps } from "../../components/User/UserProps";

export class UserApiService {
  constructor(private readonly api: ApiService) {}

  public async findUsers(): Promise<UserProps[]> {
    return await this.api.post<UserProps[]>('/users');
  }
}