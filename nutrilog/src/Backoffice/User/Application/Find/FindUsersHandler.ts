import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { FindUsersQuery } from "../../Domain/Query/FindUsersQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { FilterRequestDto } from "./FilterRequestDto";
import { FindUserResponse } from "./FindUserResponse";
import { IUserRepository } from "../../Domain/IUserRepository";
import { UserResponseBuilder } from "../Service/UserResponseBuilder";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { USER_FILTERS, CLIENT_ROLE } from "../../Domain/constants";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { UserFilter } from "../../Domain/Filter/UserFilter";
import { SearchRoleQuery } from "../../../Role/Domain/SearchRoleQuery";
import { NutrilogResponse } from "../../../../Shared/Application/NutrilogResponse";
import { UsersMetadata } from "./UsersMetadata";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { SearchRoleResponse } from "../../../Role/Application/SearchRoleResponse";
import { SubscriptionFilter } from "../../Domain/Filter/SubscriptionFilter";
import { User } from "../../Domain/Entity/User.entity";
import { Subscription } from "../../Domain/Entity/Subscription.entity";

@QueryHandler(FindUsersQuery)
export class FindUsersHandler implements IHandler<NutrilogResponse<FindUserResponse[], UsersMetadata>> {
  public constructor(
    private readonly userRepository: IUserRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly queryBus: IQueryBus,
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: FindUsersQuery): Promise<NutrilogResponse<FindUserResponse[], UsersMetadata>> {
    const presenter = new UserResponseBuilder(this.queryBus);
    const responses: FindUserResponse[] = [];

    const { filters, adminId, page, quantity } = query;
    const id = new ID(adminId);

    const userCriteria = await this.createUserCriteria(id.value, page, quantity, filters);

    const userList = await this.findUsersByCriteria(userCriteria);

    for (const user of userList) {
      const subscriptionList = await this.findSubscriptionByUser(user.id());

      responses.push(await presenter.run(user, subscriptionList));
    }


    const totalUsersResponse = await this.userRepository.countTotalUsers(adminId);

    if (totalUsersResponse.isLeft()) {
      throw totalUsersResponse.value;
    }

    return new NutrilogResponse(responses, new UsersMetadata(totalUsersResponse.value));
  }

  private async createUserCriteria(
    adminId: string,
    page: number,
    quantity: number,
    filters: FilterRequestDto[]
  ): Promise<Criteria<UserFilter>> {
    const userRole = await this.queryBus.ask<SearchRoleResponse>(new SearchRoleQuery(CLIENT_ROLE));
    const criteria = new Criteria<UserFilter>(page, quantity);

    criteria.equal('tenantId', adminId);
    criteria.equal('roleId', userRole.id);

    return this.mountUserSpecification(filters, criteria);
  }

  private mountUserSpecification(filters: FilterRequestDto[], criteria: Criteria<UserFilter>): Criteria<UserFilter> {
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

  private async findUsersByCriteria(criteria: Criteria<UserFilter>): Promise<User[]> {
    const result = await this.userRepository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }

  private async findSubscriptionByUser(userId: ID): Promise<Subscription[]> {
    const criteria = new Criteria<SubscriptionFilter>(1, 1);

    criteria.equal('userId', userId);
    criteria.equal('isActive', true);

    const result = await this.subscriptionRepository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }
}