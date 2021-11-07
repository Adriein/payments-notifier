import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { SearchRoleQuery } from "../Domain/SearchRoleQuery";
import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IRoleRepository } from "../Domain/IRoleRepository";
import { SearchRoleResponseDto } from "./SearchRoleResponseDto";

@QueryHandler(SearchRoleQuery)
export class SearchRoleHandler implements IHandler<SearchRoleResponseDto> {
  public constructor(private readonly repository: IRoleRepository) {
  }

  public async handle(query: SearchRoleQuery): Promise<any> {
    const role = await this.repository.search(query.role);

    if (!role) {
      throw new Error('no role found')
    }

    return new SearchRoleResponseDto(role.type(), role.id());
  }

}