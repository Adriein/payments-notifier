import { Dispatch } from "react";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { SignInRequest } from "./SignIn/SignInRequest";
import { SignUpRequest } from "./SignUp/SignUpRequest";

export interface AuthActionProps {
  signIn: (dispatch: Dispatch<ActionProps>) => ({ email, password }: SignInRequest) => Promise<void>;
  signUp: (dispatch: Dispatch<ActionProps>) => ({ name, email, password }: SignUpRequest) => Promise<void>;
  getToken: () => () => string | undefined;
}