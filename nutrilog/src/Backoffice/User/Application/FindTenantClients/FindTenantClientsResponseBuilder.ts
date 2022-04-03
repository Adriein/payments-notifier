import { User } from "../../Domain/Entity/User.entity";
import { FindTenantClientsResponse } from "./FindTenantClientsResponse";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { Time } from "../../../../Shared/Infrastructure/Helper/Time";


export class FindTenantClientsResponseBuilder {
  public run(user: User, pricing: PricingResponse, subscription: Subscription): FindTenantClientsResponse {
    return {
      id: user.id().value,
      username: user.name(),
      email: user.email(),
      active: user.isActive(),
      sendWarnings: user.sendWarnings(),
      pricingName: pricing.name,
      validTo: Time.format(subscription.validTo(), Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
      lastPaymentDate: Time.format(subscription.paymentDate(), Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
      isSubscriptionExpired: subscription.isExpired()
    }
  }
}