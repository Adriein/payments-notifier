import { Subscription } from "../../../types";

export interface HistorySubscriptionProps {
  inactiveSubscriptions: Subscription[];
  clientId: string;
}