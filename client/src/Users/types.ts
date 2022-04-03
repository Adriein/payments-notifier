import { Client } from "./Models/Client";
import { ClientList } from "./Models/ClientList";

export type FetchClientListPayload = {
  clientList: ClientList[];
  totalUsers: number;
}

export type FetchClientProfilePayload = {
  clientProfile: Client;
}