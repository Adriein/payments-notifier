import { FindUserResponse } from "../Find/FindUserResponse";
import { User } from "../../Domain/Entity/User.entity";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { Time } from "../../../../Shared/Infrastructure/Helper/Time";
import { Subscription } from "../../Domain/Entity/Subscription.entity";

export class UserResponseBuilder {
  public run(user: User, pricing: PricingResponse, subscriptionList: Subscription[]): FindUserResponse {
    return {
      id: user.id(),
      username: user.name(),
      email: user.email(),
      active: user.isActive(),
      defaulter: user.isSubscriptionExpired(),
      config: {
        sendNotifications: user.sendNotifications(),
        sendWarnings: user.sendWarnings(),
        role: user.roleId(),
        language: user.language()
      },
      subscription: subscriptionList.map((subscription: Subscription) => {
        return {
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
        }
      }),
    }
  }
}