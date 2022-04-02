import { Dispatch } from "react";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { FetchClientListRequest } from "./FetchClientList/FetchClientListRequest";
import { FilterProps } from "../../Shared/Action/Filter/FilterProps";
import { FetchClientProfileRequest } from "./FetchClientProfile/FetchClientProfileRequest";
import { UpdateClientRequest } from "./UpdateClient/UpdateClientRequest";

export interface UsersActionProps {
  fetchClientList: (dispatch: Dispatch<ActionProps>) => ({
    page,
    quantity,
    filters
  }: FetchClientListRequest) => Promise<void>;

  fetchClientProfile: (dispatch: Dispatch<ActionProps>) => ({
    clientId
  }: FetchClientProfileRequest) => Promise<void>;

  addFilter: (dispatch: Dispatch<ActionProps>) => (filter: FilterProps) => void;

  updateClient: (dispatch: Dispatch<ActionProps>) => (payload: UpdateClientRequest) => void;
}