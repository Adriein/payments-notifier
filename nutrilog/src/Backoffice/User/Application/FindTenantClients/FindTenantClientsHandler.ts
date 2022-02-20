import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { FindTenantClientsQuery } from "./FindTenantClientsQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { FilterRequestDto } from "./FilterRequestDto";
import { FindTenantClientsResponse } from "./FindTenantClientsResponse";
import { IUserRepository } from "../../Domain/IUserRepository";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { USER_FILTERS, CLIENT_ROLE } from "../../Domain/constants";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { UserFilter } from "../../Domain/Filter/UserFilter";
import { SearchRoleQuery } from "../../../Role/Domain/SearchRoleQuery";
import { NutrilogResponse } from "../../../../Shared/Application/NutrilogResponse";
import { UsersMetadata } from "../Find/UsersMetadata";
import { SearchRoleResponse } from "../../../Role/Application/SearchRoleResponse";
import { User } from "../../Domain/Entity/User.entity";
import { FindTenantClientsResponseBuilder } from "./FindTenantClientsResponseBuilder";
import { Client } from "../../Domain/Entity/Client.entity";

@QueryHandler(FindTenantClientsQuery)
export class FindTenantClientsHandler implements IHandler<NutrilogResponse<FindTenantClientsResponse[], UsersMetadata>> {
  public constructor(private readonly userRepository: IUserRepository, private readonly queryBus: IQueryBus) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: FindTenantClientsQuery): Promise<NutrilogResponse<FindTenantClientsResponse[], UsersMetadata>> {
    const presenter = new FindTenantClientsResponseBuilder();

    const { filters, tenantId, page, quantity } = query;
    const id = new ID(tenantId);

    const clientCriteria = await this.createClientCriteria(id.value, page, quantity, filters);

    const clientList = await this.findClientsByCriteria(clientCriteria);

    const responses = clientList.map((client: Client) => presenter.run(client))

    const totalUsersResponse = await this.userRepository.countTotalUsers(tenantId);

    if (totalUsersResponse.isLeft()) {
      throw totalUsersResponse.value;
    }

    return new NutrilogResponse(responses, new UsersMetadata(totalUsersResponse.value));
  }

  private async createClientCriteria(
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
    }

    return criteria;
  }

  private async findClientsByCriteria(criteria: Criteria<UserFilter>): Promise<User[]> {
    const result = await this.userRepository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }
}