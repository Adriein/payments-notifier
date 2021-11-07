export interface IPricingModel {
  id: string;
  pricing_name: string;
  duration: number;
  amount: number;
  subscriptions?: any[];
  created_at: Date;
  updated_at: Date;
}