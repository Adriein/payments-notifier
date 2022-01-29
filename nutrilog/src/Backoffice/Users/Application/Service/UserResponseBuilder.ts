import { GetUserResponse } from "../Find/GetUserResponse";
import { User } from "../../Domain/Entity/User.entity";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { DateUtils } from "../../../../Shared/Infrastructure/Helper/Date.utils";

export class UserResponseBuilder {
  public run(user: User, pricing: PricingResponse): GetUserResponse {
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
      subscription: {
        pricing: {
          price: pricing.price,
          name: pricing.name,
          duration: pricing.duration
        },
        isNotified: user.isNotified(),
        isWarned: user.isWarned(),
        lastPayment: DateUtils.format(user.paymentDate(), DateUtils.AMERICAN_BEAUTIFIED_DATE_FORMAT),
        validTo: DateUtils.format(user.subscriptionValidTo(), DateUtils.AMERICAN_BEAUTIFIED_DATE_FORMAT),
        isActive: user.isSubscriptionActive()
      },
    }
  }
}