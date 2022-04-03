import { FilterProps } from "../../Shared/Action/Filter/FilterProps";
import { ClientList } from "../Models/ClientList";
import { Client } from "../Models/Client";

export interface UserStateProps {
  isLoading: boolean;
  clientList: ClientList[];
  filters: FilterProps[];
  totalUsers: number;
  clientProfile?: Client;
}