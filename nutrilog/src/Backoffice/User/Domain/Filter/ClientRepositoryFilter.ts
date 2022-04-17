import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { RepositoryFilter } from "../../../../Shared/Domain/Entities/RepositoryFilter";
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";

export interface ClientRepositoryFilter extends RepositoryFilter {
  withName(name: string): this;

  isActive(isActive: boolean): this;
  
  withRole(roleName: string): this;

  withTenant(id: ID): this;

  withEmail(email: Email): this;

  withActiveSubscription(activeSubscription: boolean): this;

  withSubscriptionValidTo(validTo: DateVo): this;

  withSubscriptionExpired(expired: boolean): this;

  withSubscriptionPaymentDate(paymentDate: DateVo): this;

  acceptReceiveWarnings(warnings: boolean): this;

  acceptReceiveNotifications(notifications: boolean): this;

  hasPricingOfType(pricingName: string): this;

  hasPricingWithDurationOf(duration: number): this;

  hasPricingWithCostOf(pricingAmount: number): this;
}