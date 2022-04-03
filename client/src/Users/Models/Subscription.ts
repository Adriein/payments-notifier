export interface Subscription {
  id: string;
  pricing: SubscriptionPricing;
  lastPayment: string
  validTo: string
  isActive: boolean;
  isExpired: boolean;
  history: SubscriptionHistory[];
}

export interface SubscriptionHistory {
  event: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPricing {
  id: string;
  price: number;
  name: string;
  duration: number;
}