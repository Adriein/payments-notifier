import { Subscription } from "./Subscription";


export interface Client {
  id: string;
  username: string;
  email: string;
  defaulter: boolean;
  active: boolean;
  subscription: Subscription[];
  config: Config;
  revenue: Revenue;
}

export interface Config {
  sendNotifications: boolean,
  sendWarnings: boolean,
  language: string,
  role: string,
}

export interface Revenue {
  spent: string;
  since: string;
  monthlyRecurringRevenue: string;
}