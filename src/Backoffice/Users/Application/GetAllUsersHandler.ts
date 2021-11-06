import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { GetAllUsersQuery } from "../Domain/Query/GetAllUsersQuery";
import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IUserRepository } from "../Domain/IUserRepository";
import { IQueryBus } from "../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponseDto } from "../../Pricing/Application/PricingResponse.dto";
import { GetUserResponseDto } from "./GetUserResponseDto";
import { GetPricingQuery } from "../../Pricing/Domain/GetPricingQuery";
import { Log } from "../../../Shared/Domain/Decorators/Log";
import { FilterRequestDto } from "./FilterRequestDto";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IHandler<GetUserResponseDto[]> {
  public constructor(
    private readonly repository: IUserRepository,
    private readonly bus: IQueryBus<PricingResponseDto>
  ) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(query: GetAllUsersQuery): Promise<GetUserResponseDto[]> {
    const responses: GetUserResponseDto[] = [];

    if (this.hasFilters(query.filters)) {
      const criteria = this.mapFiltersToCriteria(query.filters);

      const users = await this.repository.find(criteria);

      for (const user of users) {
        const pricing = await this.bus.ask(new GetPricingQuery(user.pricingId()));

        responses.push(new GetUserResponseDto(user, pricing));
      }

      return responses;
    }

    const users = await this.repository.findAllUsersByAdminWithActiveSubscriptions(query.adminId);

    for (const user of users) {
      const pricing = await this.bus.ask(new GetPricingQuery(user.pricingId()));

      responses.push(new GetUserResponseDto(user, pricing));
    }

    return responses;
  }

  private hasFilters(filters: FilterRequestDto[]): boolean {
    return filters.length > 0;
  }

  private mapFiltersToCriteria(filters: FilterRequestDto[]): Criteria {
    const criteria = new Criteria();

    for (const filter of filters) {
      criteria.field(filter.field).equals(filter.value);
    }

    return criteria;
  }
}