import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { User } from "../../Domain/Entity/User.entity";
import { IUserRepository } from "../../Domain/IUserRepository";

export class UserFinder {
  constructor(private readonly repository: IUserRepository) {}

  public async execute(id: ID): Promise<User> {
    const result = await this.repository.findOne(id.value);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }
}