import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { FindTenantClientsQuery } from "./FindTenantClientsQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { FilterRequestDto } from "./FilterRequestDto";
import { FindTenantClientsResponse } from "./FindTenantClientsResponse";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { USER_FILTERS, CLIENT_ROLE } from "../../Domain/constants";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { UserFilter } from "../../Domain/Filter/UserFilter";
import { SearchRoleQuery } from "../../../Role/Domain/SearchRoleQuery";
import { NutrilogResponse } from "../../../../Shared/Application/NutrilogResponse";
import { SearchRoleResponse } from "../../../Role/Application/SearchRoleResponse";
import { FindTenantClientsResponseBuilder } from "./FindTenantClientsResponseBuilder";
import { Client } from "../../Domain/Entity/Client.entity";
import { IClientRepository } from "../../Domain/IClientRepository";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { SubscriptionFilter } from "../../Domain/Filter/SubscriptionFilter";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";

@QueryHandler(FindTenantClientsQuery)
export class FindTenantClientsHandler implements IHandler<NutrilogResponse<FindTenantClientsResponse[]>> {
  public constructor(
    private readonly clientRepository: IClientRepository,
    private subscriptionRepository: ISubscriptionRepository,
    private readonly queryBus: IQueryBus
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: FindTenantClientsQuery): Promise<NutrilogResponse<FindTenantClientsResponse[]>> {
    const responseBuilder = new FindTenantClientsResponseBuilder();

    const { filters, tenantId, page, quantity } = query;
    const id = new ID(tenantId);

    const clientCriteria = await this.createClientCriteria(id.value, page, quantity, filters);

    const clientList = await this.findClientsByCriteria(clientCriteria);


    const responses = [];

    for (const client of clientList) {
      const subscription = await this.findClientActiveSubscription(client.id());

      const pricing = await this.queryBus.ask<PricingResponse>(new GetPricingQuery(subscription.pricingId()));

      responses.push(responseBuilder.run(client, pricing, subscription))
    }

    return new NutrilogResponse(responses);
  }

  private async createClientCriteria(
    tenantId: string,
    page: number,
    quantity: number,
    filters: FilterRequestDto[]
  ): Promise<Criteria<UserFilter>> {
    const userRole = await this.queryBus.ask<SearchRoleResponse>(new SearchRoleQuery(CLIENT_ROLE));
    const criteria = new Criteria<UserFilter>(page, quantity);

    criteria.equal('tenantId', tenantId);
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

  private async findClientsByCriteria(criteria: Criteria<UserFilter>): Promise<Client[]> {
    const result = await this.clientRepository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }

  private async findClientActiveSubscription(clientId: ID): Promise<Subscription> {
    const criteria = new Criteria<SubscriptionFilter>();
    criteria.equal('isActive', true);
    criteria.equal('userId', clientId);
    const result = await this.subscriptionRepository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value[0];
  }
}