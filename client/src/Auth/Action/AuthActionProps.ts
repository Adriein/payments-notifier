import { Dispatch } from "react";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { SignInActionProps } from "./SignIn/SignInActionProps";

export interface AuthActionProps {
  signIn: (dispatch: Dispatch<ActionProps>) => ({ email, password }: SignInActionProps) => Promise<void>;
  getToken: () => string | undefined;
}