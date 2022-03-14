export type User = {
  id: string,
  username: string,
  email: string,
  defaulter: boolean,
  active: boolean,
  subscription: Subscription[],
  config: Config,
  revenue: ClientRevenue
};

export type Subscription = {
  id: string,
  pricing: SubscriptionPricing,
  lastPayment: string,
  validTo: string
  isActive: boolean,
  isExpired: boolean,
  history: SubscriptionHistory[]
}

export type SubscriptionHistory = {
  event: string,
  createdAt: string,
  updatedAt: string,
}

type Config = {
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

export type ClientRevenue = {
  spent: string,
  since: string,
  monthlyRecurringRevenue: string,
}