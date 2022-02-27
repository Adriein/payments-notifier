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
  lastPayment: string,
  validTo: string
  isActive: boolean,
  history: SubscriptionHistoryResponse
}

type SubscriptionHistoryResponse = {
  event: string,
  createdAt: string,
  updatedAt: string,
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

export type FetchClientListPayload = {
  clientList: ClientList[];
}

export type FetchClientProfilePayload = {
  clientProfile: User;
}

export type ClientList = {
  id: string,
  username: string,
  email: string,
  active: boolean,
  lastPaymentDate: string,
  validTo: string,
  sendWarnings: boolean,
  pricingName: string
};