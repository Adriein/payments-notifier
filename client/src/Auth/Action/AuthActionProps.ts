import { Dispatch } from "react";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { SignInActionProps } from "./SignIn/SignInActionProps";
import { SignUpActionProps } from "./SignUp/SignUpActionProps";

export interface AuthActionProps {
  signIn: (dispatch: Dispatch<ActionProps>) => ({ email, password }: SignInActionProps) => Promise<void>;
  signUp: (dispatch: Dispatch<ActionProps>) => ({ name, email, password }: SignUpActionProps) => Promise<void>;
  getToken: () => () => string | undefined;
}