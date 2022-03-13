import { Log } from '../../../../Shared/Domain/Decorators/Log';
import { ID } from '../../../../Shared/Domain/VO/Id.vo';
import { GetClientProfileQuery } from './GetClientProfileQuery';
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { SubscriptionFilter } from "../../Domain/Filter/SubscriptionFilter";
import {
  GetClientProfileResponse,
  SubscriptionHistoryResponse,
  SubscriptionResponse
} from "./GetClientProfileResponse";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";
import { Time } from "../../../../Shared/Infrastructure/Helper/Time";
import { SubscriptionHistory } from "../../Domain/Entity/SubscriptionHistory.entity";
import { User } from "../../Domain/Entity/User.entity";
import { ClientFinder } from "../Service/ClientFinder";
import { NutrilogResponse } from "../../../../Shared/Application/NutrilogResponse";

@QueryHandler(GetClientProfileQuery)
export class GetClientProfileHandler implements IHandler<NutrilogResponse<GetClientProfileResponse>> {
  constructor(
    private readonly finder: ClientFinder,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly queryBus: IQueryBus
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: GetClientProfileQuery): Promise<NutrilogResponse<GetClientProfileResponse>> {
    const client = await this.finder.execute(new ID(command.userId));

    const subscriptionList = await this.findSubscriptionsByUser(client.id());

    const response = await this.responseBuilder(client, subscriptionList);

    return new NutrilogResponse<GetClientProfileResponse>(response);
  }

  private async findSubscriptionsByUser(userId: ID): Promise<Subscription[]> {
    const criteria = new Criteria<SubscriptionFilter>();

    criteria.equal('userId', userId);
    criteria.orderBy('createdAt', 'desc')

    const result = await this.subscriptionRepository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }

  private async responseBuilder(user: User, subscriptionList: Subscription[]): Promise<GetClientProfileResponse> {
    const subscriptionResponseList = await this.subscriptionBuilder(subscriptionList);
    const spent = this.calculateTotalRevenue(subscriptionResponseList);
    const monthlyRecurringRevenue = spent > 0 && subscriptionResponseList.length > 1 ? spent / subscriptionResponseList.length : spent;

    return {
      id: user.id().value,
      username: user.name(),
      email: user.email(),
      active: user.isActive(),
      config: {
        sendWarnings: user.sendWarnings(),
        language: user.language(),
        sendNotifications: user.sendNotifications(),
        role: user.roleId().value
      },
      subscription: subscriptionResponseList,
      revenue: {
        since: Time.format(user.createdAt(), Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
        spent,
        monthlyRecurringRevenue
      }
    }
  }

  private async subscriptionBuilder(subscriptionList: Subscription[]): Promise<SubscriptionResponse[]> {
    const response = [];

    for (const subscription of subscriptionList) {
      const pricing = await this.queryBus.ask<PricingResponse>(new GetPricingQuery(subscription.pricingId()));
      response.push({
        id: subscription.id().value,
        pricing: {
          price: pricing.price,
          name: pricing.name,
          duration: pricing.duration
        },
        lastPayment: Time.format(subscription.paymentDate(), Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
        validTo: Time.format(subscription.validTo(), Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
        isExpired: subscription.isExpired(),
        isActive: subscription.isActive(),
        history: this.subscriptionHistoryBuilder(subscription)
      });
    }

    return response;
  }

  private subscriptionHistoryBuilder(subscription: Subscription): SubscriptionHistoryResponse[] {
    return subscription.history().data().map((history: SubscriptionHistory) => {
      return {
        event: history.event(),
        createdAt: Time.format(history.createdAt(), Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
        updatedAt: Time.format(history.updatedAt(), Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
      }
    });
  }

  private calculateTotalRevenue(subscriptionResponse: SubscriptionResponse[]): number {
    return subscriptionResponse.reduce((total, subscription: SubscriptionResponse) => {
      return total + subscription.pricing.price;
    }, 0);
  }
}
