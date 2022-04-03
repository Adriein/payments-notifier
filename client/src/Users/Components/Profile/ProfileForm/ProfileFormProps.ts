import { Client } from "../../../Models/Client";

export interface ProfileFormProps {
  user: Client;
  toggleEdit: () => void;
}