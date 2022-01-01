import { Dispatch } from "react";
import { LOCALSTORAGE_USER_ID, LOCALSTORAGE_USERNAME, SIGN_UP_ACTION } from "../../constants";
import { ApiService } from "../../../Shared/Services/ApiService";
import { ActionProps } from "../../../Shared/Action/ActionProps";
import { SignUpActionProps } from "./SignUpActionProps";
import { SignUpApiCall } from "./SignUpApiCall";

export const signUp = (dispatch: Dispatch<ActionProps>) => {
  return async ({ name, email, password }: SignUpActionProps): Promise<void> => {
    const api = ApiService.instance();

    const response = await api.post<SignUpApiCall, SignUpActionProps>('/register', {
      name,
      email,
      password,
    });

    localStorage.setItem(LOCALSTORAGE_USER_ID, response.id);
    localStorage.setItem(LOCALSTORAGE_USERNAME, response.username);

    dispatch({ type: SIGN_UP_ACTION });
  };
};