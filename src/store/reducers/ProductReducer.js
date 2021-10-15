import { SET_PRODUCTS } from "../types/ProductTypes";

const INIT_STATE = {
  items: [],
  category: "",
};

export default function productReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        //TODO: figure out if i need ... here!!
        items: [...action.payload],
      };

    default:
      return state;
  }
}
