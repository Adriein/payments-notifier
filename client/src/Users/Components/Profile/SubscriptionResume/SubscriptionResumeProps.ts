export interface SubscriptionResumeProps {
  clientId: string;
  pricingId: string;
  name: string;
  duration: number;
  price: number;
  validTo: string;
  expired: boolean;
}