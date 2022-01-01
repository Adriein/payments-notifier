import createDataContext from "../../Shared/Context/createDataContext";
import { AuthStateProps } from "./AuthStateProps";
import { authReducer } from "./authReducer";
import { signIn } from "../Action/SignIn/signIn";
import { signUp } from "../Action/SignUp/signUp";
import { getToken } from "../Action/getToken";
import { AuthActionProps } from "../Action/AuthActionProps";


export const { Provider: AuthProvider, Context: AuthContext } = createDataContext<AuthStateProps, AuthActionProps>(
  authReducer,
  { signIn, getToken, signUp },
  { isSignedIn: false, error: undefined, config: {} }
);