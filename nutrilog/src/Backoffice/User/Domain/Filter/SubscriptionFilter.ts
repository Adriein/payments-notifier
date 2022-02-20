import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";

export interface SubscriptionFilter {
  userId: ID;
  pricingId: ID;
  lastPayment: DateVo;
  validTo: DateVo;
  isActive: boolean;
  isWarned: boolean;
  isExpired: boolean;
}