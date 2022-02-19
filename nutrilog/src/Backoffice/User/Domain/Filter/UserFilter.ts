export interface UserFilter {
  name: string;
  active: boolean;
  roleId: string;
  tenantId: string;
  email: string;
  isSubscriptionActive: boolean;
  sendWarnings: boolean;
}