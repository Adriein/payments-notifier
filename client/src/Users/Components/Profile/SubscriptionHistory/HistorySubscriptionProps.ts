import { Subscription } from "../../../Models/Subscription";

export interface HistorySubscriptionProps {
  inactiveSubscriptions: Subscription[];
  clientId: string;
}