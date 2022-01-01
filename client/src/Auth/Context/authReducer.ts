import { AuthStateProps } from "./AuthStateProps";
import { ActionProps } from "../../Shared/Action/ActionProps";
import { SIGN_IN_ACTION, SIGN_OUT_ACTION, SIGN_UP_ACTION } from "../constants";

export const authReducer = (state: AuthStateProps, action: ActionProps): AuthStateProps => {
  switch (action.type) {
    case SIGN_IN_ACTION:
      return { ...state, isSignedIn: true };
    case SIGN_UP_ACTION:
      return { ...state, isSignedIn: true };
    case SIGN_OUT_ACTION:
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};