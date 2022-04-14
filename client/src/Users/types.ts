import { Client } from "./Models/Client";
import { ClientList } from "./Models/ClientList";

export type FetchClientListPayload = {
  clientList: ClientList[];
  totalUsers: number;
}

export type FetchClientProfilePayload = {
  clientProfile: Client;
}

export type FilterForm = { entity: string, fields: { value: string, label: string }[], operations: { value: string, label: string }[], values: { value: string, label: string }[] };
export type SelectedFilterForm = { entity: string, field: string, operation: string, value: string };