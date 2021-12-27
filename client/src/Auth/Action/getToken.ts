import { COOKIE_SESSION_NAME } from "../constants";

export const getToken = () => (): string | undefined => {
  const cookie = document.cookie.split('; ').find((row) => row.startsWith(COOKIE_SESSION_NAME));
  if (cookie) {
    return cookie.split('=')[1];
  }

  return undefined;
};