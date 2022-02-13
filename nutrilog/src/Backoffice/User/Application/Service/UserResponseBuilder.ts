import { FindUserResponse, GetSubscriptionResponse } from "../Find/FindUserResponse";
import { User } from "../../Domain/Entity/User.entity";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { Time } from "../../../../Shared/Infrastructure/Helper/Time";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";

export class UserResponseBuilder {
  constructor(private readonly queryBus: IQueryBus) {}

  public async run(user: User, subscriptionList: Subscription[]): Promise<FindUserResponse> {
    return {
      id: user.id().value,
      username: user.name(),
      email: user.email(),
      active: user.isActive(),
      config: {
        sendNotifications: user.sendNotifications(),
        sendWarnings: user.sendWarnings(),
        role: user.roleId().value,
        language: user.language()
      },
      subscription: await this.addPricingToSubscriptionList(subscriptionList)
    }
  }

  private async addPricingToSubscriptionList(subscriptionList: Subscription[]): Promise<GetSubscriptionResponse[]> {
    const result: GetSubscriptionResponse[] = [];

    for (const subscription of subscriptionList) {
      const pricing = await this.queryBus.ask<PricingResponse>(new GetPricingQuery(subscription.pricingId()));

      result.push({
        pricing: {
          price: pricing.price,
          name: pricing.name,
          duration: pricing.duration
        },
        isNotified: subscription.isNotified(),
        isWarned: subscription.isWarned(),
        lastPayment: Time.format(subscription.paymentDate(), Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
        validTo: Time.format(subscription.validTo(), Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
        isActive: subscription.isActive()
      });
    }

    return result;
  }
}