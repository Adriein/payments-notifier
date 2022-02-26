import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { SearchRoleQuery } from "../Domain/SearchRoleQuery";
import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IRoleRepository } from "../Domain/IRoleRepository";
import { SearchRoleResponse } from "./SearchRoleResponse";
import { Log } from "../../../Shared/Domain/Decorators/Log";

@QueryHandler(SearchRoleQuery)
export class SearchRoleHandler implements IHandler<SearchRoleResponse> {
  public constructor(private readonly repository: IRoleRepository) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(query: SearchRoleQuery): Promise<SearchRoleResponse> {
    const result = await this.repository.search(query.role);

    if (result.isLeft()) {
      throw result.value;
    }

    const [ role ] = result.value;

    return new SearchRoleResponse(role.type(), role.id().value);
  }

}