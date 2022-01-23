export type User = {
  id: string,
  username: string,
  email: string,
  defaulter: boolean,
  active: boolean,
  subscription: GetSubscriptionResponse,
  config: GetConfigResponse,
};

type GetSubscriptionResponse = {
  pricing: SubscriptionPricing,
  lastPayment: Date,
  isWarned: boolean,
  isNotified: boolean,
  isActive: boolean,
}

type GetConfigResponse = {
  sendNotifications: boolean,
  sendWarnings: boolean,
  language: string,
  role: string,
}

type SubscriptionPricing = {
  price: number;
  name: string;
  duration: number;
}

export type FetchUsersPayload = {
  users: User[];
  totalUsers: number;
}