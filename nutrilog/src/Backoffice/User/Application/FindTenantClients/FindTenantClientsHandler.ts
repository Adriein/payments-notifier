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
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";


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

    this.createClientCriteria(id.value, page, quantity, filters);

    const clientList = await this.findClientsByCriteria();

    const responses = [];

    for (const client of clientList) {
      const subscription = await this.findClientActiveSubscription(client.id());

      const pricing = await this.queryBus.ask<PricingResponse>(new GetPricingQuery(subscription.pricingId()));

      responses.push(responseBuilder.run(client, pricing, subscription))
    }

    return new NutrilogResponse(responses);
  }

  private createClientCriteria(
    tenantId: string,
    page: number,
    quantity: number,
    filters: FilterRequestDto[]
  ): void {

    for (const filter of filters) {
      switch (filter.entity) {
        case 'user':
          this.clientFilter.isActive(Boolean(filter.value));
          continue;
        case 'pricing':
          if (filter.field === 'duration') {
            this.clientFilter.hasPricingWithDurationOf(Number(filter.value));
          }
          if (filter.field === 'amount') {
            this.clientFilter.hasPricingWithCostOf(Number(filter.value));
          }
          if (filter.field === 'pricing_name') {
            this.clientFilter.hasPricingOfType(filter.value);
          }
          continue;
        case 'config':
          if (filter.field === 'send_warnings') {
            this.clientFilter.acceptReceiveWarnings(Boolean(filter.value));
          }
          if (filter.field === 'send_notifications') {
            this.clientFilter.acceptReceiveNotifications(Boolean(filter.value));
          }
          continue;
        case 'subscription':
          if (filter.field === 'valid_to') {
            this.clientFilter.withSubscriptionValidTo(new DateVo(filter.value));
          }
          if (filter.field === 'payment_date') {
            this.clientFilter.withSubscriptionPaymentDate(new DateVo(filter.value));
          }
          if (filter.field === 'active') {
            this.clientFilter.withActiveSubscription(Boolean(filter.value));
          }
          if (filter.field === 'expired') {
            this.clientFilter.withSubscriptionExpired(Boolean(filter.value));
          }
      }
    }

    this.clientFilter
      .withTenant(new ID(tenantId))
      .withRole(CLIENT_ROLE)
      .setQuantity(quantity)
      .setPage(page);
  }

  private async findClientsByCriteria(): Promise<Client[]> {
    const result = await this.clientRepository.find(this.clientFilter);

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