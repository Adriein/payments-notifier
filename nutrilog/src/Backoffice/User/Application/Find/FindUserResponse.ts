export type FindUserResponse = {
  id: string,
  username: string,
  email: string,
  active: boolean,
  subscription: GetSubscriptionResponse[],
  config: GetConfigResponse,
};

export type GetSubscriptionResponse = {
  pricing: SubscriptionPricing,
  lastPayment: string,
  validTo: string,
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