import { Dispatch } from "react";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { SignInActionPayload } from "./SignIn/SignInActionPayload";
import { SignUpActionPayload } from "./SignUp/SignUpActionPayload";

export interface AuthActionProps {
  signIn: (dispatch: Dispatch<ActionProps>) => ({ email, password }: SignInActionPayload) => Promise<void>;
  signUp: (dispatch: Dispatch<ActionProps>) => ({ name, email, password }: SignUpActionPayload) => Promise<void>;
  getToken: () => () => string | undefined;
}