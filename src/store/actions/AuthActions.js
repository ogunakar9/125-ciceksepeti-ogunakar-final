import {
  SET_USER,
  SG_SIGN_IN,
  SG_SIGN_OUT,
  SG_SIGN_UP,
} from "../types/AuthTypes";

export const signIn = () => ({
  type: SG_SIGN_IN,
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

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});
