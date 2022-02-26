import { ID } from "../../../../Shared/Domain/VO/Id.vo";

export interface UserFilter {
  name: string;
  active: boolean;
  roleId: ID;
  tenantId: ID;
  email: string;
  isSubscriptionActive: boolean;
  sendWarnings: boolean;
}