import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { GetAllUsersQuery } from "../../Domain/Query/GetAllUsersQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { FilterRequestDto } from "./FilterRequestDto";
import { GetUserResponse } from "./GetUserResponse";
import { IUserRepository } from "../../Domain/IUserRepository";
import { GetUserPresenter } from "./GetUserPresenter";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";
import { User } from "../../Domain/User.entity";
import { CompositeSpecification } from "../../../../Shared/Domain/Specification/CompositeSpecification";
import { USER_FILTERS, UserFilters } from "../../Domain/constants";
import { SubscriptionActiveSpecification } from "../../Domain/Specifications/SubscriptionActiveSpecification";
import { UserNameSpecification } from "../../Domain/Specifications/UserNameSpecification";
import { UserActiveSpecification } from "../../Domain/Specifications/UserActiveSpecification";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IHandler<GetUserResponse[]> {
  public constructor(private readonly repository: IUserRepository, private queryBus: IQueryBus<PricingResponse>) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: GetAllUsersQuery): Promise<GetUserResponse[]> {
    const presenter = new GetUserPresenter();
    const responses: GetUserResponse[] = [];

    const { filters, adminId } = query;
    const id = new ID(adminId);

    const users = await this.repository.find(id.value);

    for (const user of users) {
      const pricing = await this.queryBus.ask(new GetPricingQuery(user.pricingId()));
      const spec = this.mountSpecification(filters).pop();

      if (spec?.IsSatisfiedBy(user)) {
        const userResponse = presenter.execute(user, pricing);

        responses.push(userResponse);
        continue;
      }

      const userResponse = presenter.execute(user, pricing);
      responses.push(userResponse);
    }

    return responses;

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
          specList.push(spec)
        }
        const nameSpec = new UserNameSpecification(filter.value as UserFilters[USER_FILTERS.NAME]);
        specList.push(nameSpec)
      }

      if (filter.field === USER_FILTERS.EXPIRED) {
        const spec = specList.pop();

        if (spec) {
          spec.and(new SubscriptionActiveSpecification(filter.value as UserFilters[USER_FILTERS.EXPIRED]));
          specList.push(spec)
        }
        const subscriptionSpec = new SubscriptionActiveSpecification(filter.value as UserFilters[USER_FILTERS.EXPIRED]);
        specList.push(subscriptionSpec)
      }
    }

    return specList;
  }
}