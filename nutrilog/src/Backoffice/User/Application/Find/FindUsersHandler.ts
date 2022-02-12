import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { FindUsersQuery } from "../../Domain/Query/FindUsersQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { FilterRequestDto } from "./FilterRequestDto";
import { FindUserResponse } from "./FindUserResponse";
import { IUserRepository } from "../../Domain/IUserRepository";
import { UserResponseBuilder } from "../Service/UserResponseBuilder";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";
import { USER_FILTERS, USER_ROLE } from "../../Domain/constants";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { UserFilter } from "../../Domain/UserFilter";
import { SearchRoleResponse } from "../../../Role/Application/SearchRoleResponse";
import { SearchRoleQuery } from "../../../Role/Domain/SearchRoleQuery";
import { NutrilogResponse } from "../../../../Shared/Application/NutrilogResponse";
import { UsersMetadata } from "./UsersMetadata";

@QueryHandler(FindUsersQuery)
export class FindUsersHandler implements IHandler<NutrilogResponse<FindUserResponse[], UsersMetadata>> {
  public constructor(
    private readonly repository: IUserRepository,
    private readonly pricing: IQueryBus<PricingResponse>,
    private readonly role: IQueryBus<SearchRoleResponse>
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: FindUsersQuery): Promise<NutrilogResponse<FindUserResponse[], UsersMetadata>> {
    const presenter = new UserResponseBuilder();
    const responses: FindUserResponse[] = [];

    const { filters, adminId, page, quantity } = query;
    const id = new ID(adminId);

    const criteria = await this.createCriteria(id.value, page, quantity, filters);

    const result = await this.repository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    const users = result.value;

    for (const user of users) {
      const pricing = await this.pricing.ask(new GetPricingQuery(user.pricingId()));

      const userResponse = presenter.run(user, pricing);
      responses.push(userResponse);
    }

    const totalUsersResponse = await this.repository.countTotalUsers(adminId);

    if (totalUsersResponse.isLeft()) {
      throw totalUsersResponse.value;
    }

    return new NutrilogResponse(responses, new UsersMetadata(totalUsersResponse.value));
  }

  private async createCriteria(
    adminId: string,
    page: number,
    quantity: number,
    filters: FilterRequestDto[]
  ): Promise<Criteria<UserFilter>> {
    const userRole = await this.role.ask(new SearchRoleQuery(USER_ROLE));
    const criteria = new Criteria<UserFilter>(page, quantity);

    criteria.equal('ownerId', adminId);
    criteria.equal('roleId', userRole.id);

    return this.mountSpecification(filters, criteria);
  }

  private mountSpecification(filters: FilterRequestDto[], criteria: Criteria<UserFilter>): Criteria<UserFilter> {
    for (const filter of filters) {
      if (filter.field === USER_FILTERS.ACTIVE) {
        criteria.equal('active', true);
      }

      if (filter.field === USER_FILTERS.NAME) {
        criteria.like('name', filter.value);
      }

      if (filter.field === USER_FILTERS.EXPIRED) {
        criteria.equal('isSubscriptionActive', false);
      }
    }

    return criteria;
  }
}