import {
  SET_PRODUCTS,
  SET_CATEGORIES,
  SET_PRODUCT_DETAILS,
} from "../types/ProductTypes";

const INIT_STATE = {
  items: [],
  categories: [],
  productDetails: {},
};

export default function productReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        items: action.payload,
      };

    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case SET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload,
      };

    default:
      return state;
  }
}
