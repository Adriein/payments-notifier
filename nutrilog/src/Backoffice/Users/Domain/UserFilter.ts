export interface UserFilter {
  name: string;
  active: boolean;
  roleId: string;
  ownerId: string;
  email: string;
  isSubscriptionActive: boolean;
  sendWarnings: boolean;
}