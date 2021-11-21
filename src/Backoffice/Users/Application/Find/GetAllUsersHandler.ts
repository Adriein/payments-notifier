import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { GetAllUsersQuery } from "../../Domain/Query/GetAllUsersQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { GetUserResponseDto } from "../Dto/GetUserResponseDto";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { Filter } from "../../../../Shared/Domain/Entities/Filter";
import { OPERATORS } from "../../../../Domain/constants";
import { FilterRequestDto } from "../Dto/FilterRequestDto";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IHandler<GetUserResponseDto[]> {
  public constructor(private readonly repository: IUserRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: GetAllUsersQuery): Promise<GetUserResponseDto[]> {
    const responses: GetUserResponseDto[] = [];

    if (this.hasFilters(query.filters)) {
      const criteria = this.mapFiltersToCriteria(query.filters);

      const users = await this.repository.find(criteria);

      for (const user of users) {
        responses.push(new GetUserResponseDto(user));
      }

      return responses;
    }

    const users = await this.repository.findUsersWithActiveSubscriptions(query.adminId);

    for (const user of users) {
      responses.push(new GetUserResponseDto(user));
    }

    return responses;
  }

  private hasFilters(filters: FilterRequestDto[]): boolean {
    return filters.length > 0;
  }

  private mapFiltersToCriteria(queryFilters: FilterRequestDto[]): Criteria {
    const filters = queryFilters.map((filter: FilterRequestDto) => new Filter(
      filter.field,
      filter.value,
      filter.operation as unknown as OPERATORS
    ));

    return new Criteria(filters);
  }
}