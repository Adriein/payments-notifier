import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { FindTenantClientsQuery } from "./FindTenantClientsQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { FilterRequestDto } from "./FilterRequestDto";
import { FindTenantClientsResponse } from "./FindTenantClientsResponse";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { CLIENT_ROLE, USER_FILTERS } from "../../Domain/constants";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { ClientRepositoryFilter } from "../../Domain/Filter/ClientRepositoryFilter";
import { NutrilogResponse } from "../../../../Shared/Application/NutrilogResponse";
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
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly clientFilter: ClientRepositoryFilter,
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
  ): Promise<any> {

    this.clientFilter
      .withTenant(new ID(tenantId))
      .withRole(CLIENT_ROLE)
      .setQuantity(quantity)
      .setPage(page);
  }

  private async findClientsByCriteria(criteria: Criteria<ClientRepositoryFilter>): Promise<Client[]> {
    const result = await this.clientRepository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }

  private async findClientActiveSubscription(clientId: ID): Promise<Subscription> {
    const criteria = new Criteria<SubscriptionFilter>();
    criteria.equal('userId', clientId);
    criteria.orderBy('createdAt', 'desc');

    const result = await this.subscriptionRepository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value[0];
  }
}