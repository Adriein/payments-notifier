export interface UserProps {
  id: string,
  username: string,
  email: string,
  defaulter: boolean,
  active: boolean,
  subscription: SubscriptionResponse,
  config: ConfigResponse,
}

type SubscriptionResponse = {
  pricing: SubscriptionPricing,
  lastPayment: Date,
  isWarned: boolean,
  isNotified: boolean,
  isActive: boolean,
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