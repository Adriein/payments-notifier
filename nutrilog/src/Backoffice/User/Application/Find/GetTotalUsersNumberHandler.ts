import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { GetTotalUsersNumberQuery } from "../../Domain/Query/GetTotalUsersNumberQuery";

@QueryHandler(GetTotalUsersNumberQuery)
export class GetTotalUsersNumberHandler implements IHandler<number> {
  constructor(private repository: IUserRepository) {}

  public async handle({ adminId }: GetTotalUsersNumberQuery): Promise<number> {
    const result = await this.repository.countTotalUsers(adminId);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }
}