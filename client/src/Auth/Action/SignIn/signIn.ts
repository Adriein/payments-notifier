import { Dispatch } from "react";
import { LOCALSTORAGE_USER_ID, LOCALSTORAGE_USERNAME, SIGN_IN_ACTION } from "../../constants";
import { SignInRequest } from "./SignInRequest";
import { ApiService } from "../../../Shared/Services/ApiService";
import { SignInResponse } from "./SignInResponse";
import { ActionProps } from "../../../Shared/Action/ActionProps";

export const signIn = (dispatch: Dispatch<ActionProps>) => {
  return async ({ email, password }: SignInRequest): Promise<void> => {
    const api = ApiService.instance();

    const response = await api.post<SignInResponse, SignInRequest>('/signin', {
      email,
      password,
    });

    localStorage.setItem(LOCALSTORAGE_USER_ID, response.id);
    localStorage.setItem(LOCALSTORAGE_USERNAME, response.username);

    dispatch({ type: SIGN_IN_ACTION });
  };
};