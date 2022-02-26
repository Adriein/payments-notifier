export type GetClientProfileResponse = {
  id: string,
  username: string,
  email: string,
  active: boolean,
  subscription: SubscriptionResponse[],
  config: ConfigResponse,
};

export type SubscriptionResponse = {
  pricing: SubscriptionPricing,
  lastPayment: string,
  validTo: string,
  isExpired: boolean,
  isActive: boolean,
  history: SubscriptionHistoryResponse[]
}

export type SubscriptionHistoryResponse = {
  event: string,
  createdAt: string
}

type ConfigResponse = {
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