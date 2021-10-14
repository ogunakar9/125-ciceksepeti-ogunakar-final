import {
  SG_SIGN_IN,
  SG_SIGN_UP,
  SG_SIGN_OUT,
  SG_CHECK_SESSION,
} from "../types/AuthTypes";

export const signIn = (email, password) => ({
  type: SG_SIGN_IN,
  payload: {
    email,
    password,
  },
});

export const signUp = (email, password) => ({
  type: SG_SIGN_UP,
  payload: {
    email,
    password,
  },
});

export const signOut = () => ({
  type: SG_SIGN_OUT,
});

export const checkUserSession = (token, email) => ({
  type: SG_CHECK_SESSION,
  payload: {
    token,
    email,
  },
});
