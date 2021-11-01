export type GetUserResponse = {
  id: string,
  username: string,
  email: string,
  defaulter: string,
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
  sendNotifications: string,
  sendWarnings: string,
  language: string,
  role: string,
}

type SubscriptionPricing = {
  price: number;
  name: string;
  duration: number;
}