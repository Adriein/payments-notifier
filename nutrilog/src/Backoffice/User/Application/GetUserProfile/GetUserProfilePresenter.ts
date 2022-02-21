import {
  SubscriptionResponse,
  GetUserProfileResponse,
  SubscriptionHistoryResponse
} from "./GetUserProfileResponse";
import { User } from "../../Domain/Entity/User.entity";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { Time } from "../../../../Shared/Infrastructure/Helper/Time";
import { SubscriptionHistory } from "../../Domain/Entity/SubscriptionHistory.entity";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";

export class GetUserProfilePresenter {
  constructor(private readonly queryBus: IQueryBus) {}

  public async run(user: User, subscriptionList: Subscription[]): Promise<GetUserProfileResponse> {
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
      subscription: await this.subscriptionBuilder(subscriptionList)
    }
  }

  private async subscriptionBuilder(subscriptionList: Subscription[]): Promise<SubscriptionResponse[]> {
    const response = [];

    for (const subscription of subscriptionList) {
      const pricing = await this.queryBus.ask<PricingResponse>(new GetPricingQuery(subscription.pricingId()));
      response.push({
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
        createdAt: Time.format(history.createdAt(), Time.AMERICAN_BEAUTIFIED_DATE_FORMAT)
      }
    });
  }
}