import { GetUserProfileResponse } from "./GetUserProfileResponse";
import { User } from "../../Domain/Entity/User.entity";

export class GetUserProfilePresenter {
  public async run(user: User): Promise<GetUserProfileResponse> {
    return {
      id: user.id().value,
      username: user.name(),
      email: user.email(),
      active: user.isActive(),
      config: {
        sendWarnings: user.sendWarnings(),
        language: user.language(),
        sendNotifications: user.sendNotifications(),
        role: user.roleId().value
      },
      subscription: []
    }
  }
}