import { Dispatch } from "react";
import { LOCALSTORAGE_USER_ID, LOCALSTORAGE_USERNAME, SIGN_IN_ACTION } from "../../constants";
import { SignInActionPayload } from "./SignInActionPayload";
import { ApiService } from "../../../Shared/Services/ApiService";
import { SignInApiCall } from "./SignInApiCall";
import { ActionProps } from "../../../Shared/Action/ActionProps";

export const signIn = (dispatch: Dispatch<ActionProps>) => {
  return async ({ email, password }: SignInActionPayload): Promise<void> => {
    const api = ApiService.instance();

    const response = await api.post<SignInApiCall, SignInActionPayload>('/signin', {
      email,
      password,
    });

    localStorage.setItem(LOCALSTORAGE_USER_ID, response.id);
    localStorage.setItem(LOCALSTORAGE_USERNAME, response.username);

    dispatch({ type: SIGN_IN_ACTION });
  };
};