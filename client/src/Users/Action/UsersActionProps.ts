import { Dispatch } from "react";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { FetchClientListActionProps } from "./FetchClientList/FetchClientListActionProps";
import { FilterProps } from "../../Shared/Action/Filter/FilterProps";
import { FetchClientProfileActionProps } from "./FetchClientProfile/FetchClientProfileActionProps";
import { UpdateClientActionProps } from "./UpdateClient/UpdateClientActionProps";

export interface UsersActionProps {
  fetchClientList: (dispatch: Dispatch<ActionProps>) => ({
    page,
    quantity,
    filters
  }: FetchClientListActionProps) => Promise<void>;

  fetchClientProfile: (dispatch: Dispatch<ActionProps>) => ({
    clientId
  }: FetchClientProfileActionProps) => Promise<void>;

  addFilter: (dispatch: Dispatch<ActionProps>) => (filter: FilterProps) => void;

  updateClient: (dispatch: Dispatch<ActionProps>) => (payload: UpdateClientActionProps) => void;
}