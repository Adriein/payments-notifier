import createDataContext from "../../Shared/Context/createDataContext";
import { authReducer } from "./authReducer";
import { signIn } from "../Action/SignIn/signIn";


export const { Provider: AuthProvider, Context } = createDataContext(
  authReducer,
  { signIn },
  { isSignedIn: false, error: undefined, config: {} }
);