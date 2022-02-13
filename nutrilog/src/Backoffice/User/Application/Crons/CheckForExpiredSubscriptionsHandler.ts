import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { CheckForExpiredSubscriptionsQuery } from "../../Domain/Query/CheckForExpiredSubscriptionsQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { User } from "../../Domain/Entity/User.entity";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { UserFilter } from "../../Domain/UserFilter";
import { SearchRoleResponse } from "../../../Role/Application/SearchRoleResponse";
import { SearchRoleQuery } from "../../../Role/Domain/SearchRoleQuery";
import { ADMIN_ROLE } from "../../Domain/constants";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { SubscriptionFilter } from "../../Domain/SubscriptionFilter";
import { SubscriptionCollection } from "../../Domain/Entity/SubscriptionCollection";

@QueryHandler(CheckForExpiredSubscriptionsQuery)
export class CheckForExpiredSubscriptionsHandler implements IHandler<void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly queryBus: IQueryBus
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: CheckForExpiredSubscriptionsQuery): Promise<void> {
    const adminList = await this.findNutriLogAdminList();

    for (const admin of adminList) {
      const { duration } = await this.queryBus.ask<PricingResponse>(new GetPricingQuery(admin.id().value));

      const activeSubscription = await this.findActiveSubscription(admin.id());

      if (activeSubscription.hasExpired(duration)) {
        await this.subscriptionRepository.update(activeSubscription);
      }

      const userList = await this.findActiveUserListByAdmin(admin.id());

      for (const user of userList) {
        const { duration } = await this.queryBus.ask(new GetPricingQuery(user.id().value));

        const activeSubscription = await this.findActiveSubscription(user.id());

        if (activeSubscription.hasExpired(duration)) {
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

  private async findNutriLogAdminList(): Promise<User[]> {
    const criteria = new Criteria<UserFilter>();
    const adminRole = await this.queryBus.ask<SearchRoleResponse>(new SearchRoleQuery(ADMIN_ROLE));

    criteria.equal('roleId', adminRole.id);
    criteria.equal('active', true);

    const result = await this.userRepository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }

  private async findActiveUserListByAdmin(adminId: ID): Promise<User[]> {
    const criteria = new Criteria<UserFilter>();
    const adminRole = await this.queryBus.ask<SearchRoleResponse>(new SearchRoleQuery(ADMIN_ROLE));

    criteria.equal('ownerId', adminId.value);
    criteria.equal('active', true);

    const result = await this.userRepository.find(criteria);

    if (result.isRight()) {
      return result.value;
    }

    return [];
  }
}