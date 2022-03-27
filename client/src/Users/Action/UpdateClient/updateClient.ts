import { Dispatch } from "react";
import { ActionProps } from "../../../Shared/Action/ActionProps";
import { ASYNC_ACTION } from "../../../Shared/constants";
import { ApiService } from "../../../Shared/Services/ApiService";
import { UPDATE_CLIENT_ACTION } from "../../constants";
import { UpdateClientActionProps } from "./UpdateClientActionProps";

export const updateClient = (dispatch: Dispatch<ActionProps<any>>) => {
  return async (props: UpdateClientActionProps): Promise<void> => {
    dispatch({ type: ASYNC_ACTION });
    const api = ApiService.instance();
    try {
      await api.put<UpdateClientActionProps>('/user', props);

    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: UPDATE_CLIENT_ACTION });
    }
  };
};