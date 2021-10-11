import { SET_USER } from "../types/AuthTypes";

const INIT_STATE = {
  email: "",
  password: "",
  emailValid: true,
  user: undefined,
};

export default function authReducer(state = INIT_STATE, action) {
  switch (action.type) {
    // case SET_EMAIL:
    //   const { email, valid } = action.payload;
    //   return {
    //     ...state,
    //     email: email,
    //     emailValid: valid,
    //   };
    //
    // case SET_PASSWORD:
    //   return {
    //     ...state,
    //     password: action.payload,
    //   };

    case SET_USER:
      const { token } = action.payload;
      return {
        ...state,
        token,
      };

    default:
      return state;
  }
}
