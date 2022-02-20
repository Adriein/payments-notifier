import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { GenerateExpiredSubscriptionsReportCommand } from "./GenerateExpiredSubscriptionsReportCommand";
import { IUserRepository } from "../../Domain/IUserRepository";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { TenantFinder } from "../Service/TenantFinder";
import { Tenant } from "../../Domain/Entity/Tenant.entity";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { SubscriptionFilter } from "../../Domain/Filter/SubscriptionFilter";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { Client } from "../../Domain/Entity/Client.entity";
import { UserFilter } from "../../Domain/Filter/UserFilter";
import { SubscriptionCollection } from "../../Domain/Entity/SubscriptionCollection";

@CommandHandler(GenerateExpiredSubscriptionsReportCommand)
export class GenerateExpiredSubscriptionsReportHandler implements IHandler<void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly finder: TenantFinder,
  ) {}

  public async handle(command: GenerateExpiredSubscriptionsReportCommand): Promise<void> {
    const tenantList = await this.findTenants();

    for (const tenant of tenantList) {
      const clientList = await this.findClientsByTenant(tenant.id());

      const subscriptionCollection = await this.findExpiredSubscriptions(clientList);

      tenant.generateReport(clientList, subscriptionCollection);
    }
  }

  private async findTenants(): Promise<Tenant[]> {
    return await this.finder.execute();
  }

  private async findClientsByTenant(tenantId: ID): Promise<Client[]> {
    const criteria = new Criteria<UserFilter>();

    criteria.equal('tenantId', tenantId.value);
    criteria.equal('active', true);

    const result = await this.userRepository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }

  private async findExpiredSubscriptions(clientList: Client[]): Promise<SubscriptionCollection> {
    const criteria = new Criteria<SubscriptionFilter>();

    const clientIdList = clientList.map((client: Client) => client.id());

    criteria.equal('isExpired', true);
    criteria.equal('isActive', true);
    criteria.in('userId', clientIdList);

    const result = await this.subscriptionRepository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return new SubscriptionCollection(result.value);
  }
}