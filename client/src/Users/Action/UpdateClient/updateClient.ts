import { Dispatch } from "react";
import { ActionProps } from "../../../Shared/Action/ActionProps";
import { ASYNC_ACTION } from "../../../Shared/constants";
import { ApiService } from "../../../Shared/Services/ApiService";
import { UPDATE_CLIENT_ACTION } from "../../constants";
import { UpdateClientRequest } from "./UpdateClientRequest";

export const updateClient = (dispatch: Dispatch<ActionProps<any>>) => {
  return async (props: UpdateClientRequest): Promise<void> => {
    dispatch({ type: ASYNC_ACTION });
    const api = ApiService.instance();
    try {
      await api.put<UpdateClientRequest>('/user', props);

    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: UPDATE_CLIENT_ACTION });
    }
  };
};