import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { User } from "../Domain/User.entity";
import { GetAllUsersQuery } from "../Domain/Query/GetAllUsersQuery";
import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IHandler<User[]> {
  public async handle(query: GetAllUsersQuery): Promise<User[]> {
    throw new Error()
  }
}