import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { IUserRepository } from "../../Domain/IUserRepository";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { AppConfigResponse } from "../../../AppConfig/Application/Find/AppConfigResponse";
import { GetAppConfigQuery } from "../../../AppConfig/Domain/Query/GetAppConfigQuery";
import { CheckForAboutToExpireSubscriptionsCommand } from "./CheckForAboutToExpireSubscriptionsCommand";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { UserFilter } from "../../Domain/Filter/UserFilter";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { SubscriptionFilter } from "../../Domain/Filter/SubscriptionFilter";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { TenantCollectionFinder } from "../Service/TenantCollectionFinder";
import { Tenant } from "../../Domain/Entity/Tenant.entity";
import { Client } from "../../Domain/Entity/Client.entity";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IClientRepository } from "../../Domain/IClientRepository";

@CommandHandler(CheckForAboutToExpireSubscriptionsCommand)
export class CheckForAboutToExpireSubscriptionsHandler implements IHandler<void> {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly finder: TenantCollectionFinder,
    private readonly queryBus: IQueryBus
  ) {}


  @Log(process.env.LOG_LEVEL)
  public async handle(query: CheckForAboutToExpireSubscriptionsCommand): Promise<void> {
    const tenantList = await this.findTenants();

    for (const tenant of tenantList) {
      const clientList = await this.getClientList(tenant.id());

      const subscriptionList = await this.findNotWarnedSubscriptions(clientList)

      const appConfig = await this.findAppConfigByTenant(tenant.id());

      subscriptionList.forEach((subscription: Subscription) => {
        subscription.checkIsAboutToExpire(appConfig.warningDelay);

        if (subscription.isAboutToExpire()) {
          this.subscriptionRepository.update(subscription);
        }
      });

    }
  }

  private async findNotWarnedSubscriptions(clientList: Client[]): Promise<Subscription[]> {

    const clientIdList = clientList.map((client: Client) => client.id());

    const criteria = new Criteria<SubscriptionFilter>();
    criteria.equal('isActive', true);
    criteria.equal('isWarned', false);
    criteria.in('userId', clientIdList);

    const result = await this.subscriptionRepository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }

  private async getClientList(tenantId: ID): Promise<Client[]> {
    const criteria = new Criteria<UserFilter>();
    criteria.equal('active', true);
    criteria.equal('sendWarnings', true);
    criteria.equal('tenantId', tenantId.value);

    const result = await this.clientRepository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }

  private async findTenants(): Promise<Tenant[]> {
    return await this.finder.execute();
  }

  private async findAppConfigByTenant(tenantId: ID): Promise<AppConfigResponse> {
    return await this.queryBus.ask<AppConfigResponse>(new GetAppConfigQuery(tenantId.value));
  }

}