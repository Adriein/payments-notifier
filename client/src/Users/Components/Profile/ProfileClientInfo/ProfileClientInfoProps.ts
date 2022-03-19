import { User } from "../../../types";

export interface ProfileClientInfoProps {
  client: User
  toggleEdit: () => void;
}