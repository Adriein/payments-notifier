import { User } from "../../Domain/Entity/User.entity";
import { FindTenantClientsResponse } from "./FindTenantClientsResponse";


export class FindTenantClientsResponseBuilder {
  public run(user: User): FindTenantClientsResponse {
    return {
      id: user.id().value,
      username: user.name(),
      email: user.email(),
      active: user.isActive(),
    }
  }
}