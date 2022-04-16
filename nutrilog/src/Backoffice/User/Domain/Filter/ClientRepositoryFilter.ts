import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { RepositoryFilter } from "../../../../Shared/Domain/Entities/RepositoryFilter";

export interface ClientRepositoryFilter extends RepositoryFilter {
  withName(name: string): this;

  isActive(isActive: boolean): this;

  roleId(id: ID): this;

  withRole(roleName: string): this;

  withTenant(id: ID): this;

  withEmail(email: Email): this;

  withActiveSubscription(activeSubscription: boolean): this;

  acceptReceiveWarnings(warnings: boolean): this;

  hasPricingOfType(pricingName: string): this;

  hasPricingWithDurationOf(duration: number): this;

  hasPricingWithCostOf(pricingAmount: number): this;
}