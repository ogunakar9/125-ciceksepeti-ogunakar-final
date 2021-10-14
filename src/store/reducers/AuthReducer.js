import { SET_USER, SIGN_OUT } from "../types/AuthTypes";

const INIT_STATE = {
  token: null,
  email: null,
  userErr: false,
  isSignedIn: false,
};

export default function authReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email,
        isSignedIn: action.payload.isSignedIn,
      };
    case SIGN_OUT:
      return {
        INIT_STATE,
      };

    default:
      return state;
  }
}
