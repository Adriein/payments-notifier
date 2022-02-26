import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { CheckForExpiredSubscriptionsCommand } from "./CheckForExpiredSubscriptionsCommand";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { UserFilter } from "../../Domain/Filter/UserFilter";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { SubscriptionFilter } from "../../Domain/Filter/SubscriptionFilter";
import { SubscriptionCollection } from "../../Domain/Entity/SubscriptionCollection";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { Tenant } from "../../Domain/Entity/Tenant.entity";
import { TenantCollectionFinder } from "../Service/TenantCollectionFinder";
import { Client } from "../../Domain/Entity/Client.entity";
import { IClientRepository } from "../../Domain/IClientRepository";

@CommandHandler(CheckForExpiredSubscriptionsCommand)
export class CheckForExpiredSubscriptionsHandler implements IHandler<void> {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly finder: TenantCollectionFinder,
    private readonly queryBus: IQueryBus
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: CheckForExpiredSubscriptionsCommand): Promise<void> {
    const tenantList = await this.findTenants();

    for (const tenant of tenantList) {
      const { duration } = await this.queryBus.ask<PricingResponse>(new GetPricingQuery(tenant.id().value));

      const activeSubscription = await this.findActiveSubscription(tenant.id());

      activeSubscription.checkIsExpired(duration);

      if (activeSubscription.isExpired()) {
        await this.subscriptionRepository.update(activeSubscription);
      }

      const clientList = await this.findActiveClientListByTenant(tenant.id());

      for (const client of clientList) {
        const { duration } = await this.queryBus.ask(new GetPricingQuery(client.id().value));

        const activeSubscription = await this.findActiveSubscription(client.id());

        activeSubscription.checkIsExpired(duration);

        if (activeSubscription.isExpired()) {
          await this.subscriptionRepository.update(activeSubscription);
        }
      }
    }
  }

  private async findActiveSubscription(userId: ID): Promise<Subscription> {
    const criteria = new Criteria<SubscriptionFilter>();
    criteria.equal('userId', userId);
    criteria.equal('isActive', true);

    const result = await this.subscriptionRepository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    const subscriptionList = new SubscriptionCollection(result.value);

    return subscriptionList.getActiveSubscription();
  }

  private async findTenants(): Promise<Tenant[]> {
    return await this.finder.execute();
  }

  private async findActiveClientListByTenant(tenantId: ID): Promise<Client[]> {
    const criteria = new Criteria<UserFilter>();

    criteria.equal('tenantId', tenantId.value);
    criteria.equal('active', true);

    const result = await this.clientRepository.find(criteria);

    if (result.isRight()) {
      return result.value;
    }

    return [];
  }
}