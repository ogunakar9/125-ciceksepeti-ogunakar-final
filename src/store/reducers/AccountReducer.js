import { SET_GIVEN_OFFERS, SET_RECEIVED_OFFERS } from "../types/AccountTypes";

const INIT_STATE = {
  givenOffers: [],
  receivedOffers: [],
};

export default function accountReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case SET_GIVEN_OFFERS:
      return {
        ...state,
        givenOffers: action.payload,
      };

    case SET_RECEIVED_OFFERS:
      return {
        ...state,
        receivedOffers: action.payload,
      };

    default:
      return state;
  }
}
