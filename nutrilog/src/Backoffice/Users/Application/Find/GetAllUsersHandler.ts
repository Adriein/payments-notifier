import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { GetAllUsersQuery } from "../../Domain/Query/GetAllUsersQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { FilterRequestDto } from "./FilterRequestDto";
import { GetUserResponse } from "./GetUserResponse";
import { IUserRepository } from "../../Domain/IUserRepository";
import { UserResponseBuilder } from "../Service/UserResponseBuilder";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";
import { User } from "../../Domain/Entity/User.entity";
import { CompositeSpecification } from "../../../../Shared/Domain/Specification/CompositeSpecification";
import { USER_FILTERS, USER_ROLE, UserFilters } from "../../Domain/constants";
import { SubscriptionActiveSpecification } from "../../Domain/Specifications/SubscriptionActiveSpecification";
import { UserNameSpecification } from "../../Domain/Specifications/UserNameSpecification";
import { UserActiveSpecification } from "../../Domain/Specifications/UserActiveSpecification";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { UserFilter } from "../../Domain/UserFilter";
import { Filter } from "../../../../Shared/Domain/Entities/Filter";
import { OPERATORS } from "../../../../Shared/Domain/constants";
import { SearchRoleResponse } from "../../../Role/Application/SearchRoleResponse";
import { SearchRoleQuery } from "../../../Role/Domain/SearchRoleQuery";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IHandler<GetUserResponse[]> {
  public constructor(
    private readonly repository: IUserRepository,
    private readonly pricing: IQueryBus<PricingResponse>,
    private readonly role: IQueryBus<SearchRoleResponse>
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: GetAllUsersQuery): Promise<GetUserResponse[]> {
    const presenter = new UserResponseBuilder();
    const responses: GetUserResponse[] = [];

    const { filters, adminId } = query;
    const id = new ID(adminId);

    const criteria = await this.createCriteria(id.value, query.page, query.quantity);

    const result = await this.repository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    const users = result.value;

    for (const user of users) {
      const pricing = await this.pricing.ask(new GetPricingQuery(user.pricingId()));
      const spec = this.mountSpecification(filters).pop();

      if (spec?.IsSatisfiedBy(user)) {
        const userResponse = presenter.run(user, pricing);

        responses.push(userResponse);
        continue;
      }

      const userResponse = presenter.run(user, pricing);
      responses.push(userResponse);
    }

    return responses;

  }

  private async createCriteria(adminId: string, page: number, quantity: number): Promise<Criteria<UserFilter>> {
    const userRole = await this.role.ask(new SearchRoleQuery(USER_ROLE));
    const criteria = new Criteria<UserFilter>(page, quantity);

    criteria.add(new Filter<UserFilter>('ownerId', OPERATORS.equal, adminId));
    criteria.add(new Filter<UserFilter>('roleId', OPERATORS.equal, userRole.id));

    return criteria;
  }

  private mountSpecification(filters: FilterRequestDto[]): CompositeSpecification<User>[] {
    const specList: CompositeSpecification<User>[] = []

    for (const filter of filters) {
      if (filter.field === USER_FILTERS.ACTIVE) {
        const activeSpec = new UserActiveSpecification(filter.value as UserFilters[USER_FILTERS.ACTIVE]);

        specList.push(activeSpec);
      }

      if (filter.field === USER_FILTERS.NAME) {
        const spec = specList.pop();

        if (spec) {
          spec.and(new UserNameSpecification(filter.value as UserFilters[USER_FILTERS.NAME]));
          specList.push(spec);
          continue;
        }
        const nameSpec = new UserNameSpecification(filter.value as UserFilters[USER_FILTERS.NAME]);
        specList.push(nameSpec)
      }

      if (filter.field === USER_FILTERS.EXPIRED) {
        const spec = specList.pop();

        if (spec) {
          spec.and(new SubscriptionActiveSpecification(filter.value as UserFilters[USER_FILTERS.EXPIRED]));
          specList.push(spec);
          continue;
        }
        const subscriptionSpec = new SubscriptionActiveSpecification(filter.value as UserFilters[USER_FILTERS.EXPIRED]);
        specList.push(subscriptionSpec)
      }
    }

    return specList;
  }
}