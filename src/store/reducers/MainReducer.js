import { SET_LOADING } from "../types/MainTypes";

const INIT_STATE = {
  loading: false,
};

export default function mainReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    default:
      return state;
  }
}
