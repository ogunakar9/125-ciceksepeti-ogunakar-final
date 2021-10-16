import {
  SG_FETCH_PRODUCTS,
  SG_FETCH_CATEGORIES,
  SG_FETCH_PRODUCT_DETAIL,
  SG_GIVE_OFFER,
} from "../types/ProductTypes";

export const fetchProducts = () => ({
  type: SG_FETCH_PRODUCTS,
});

export const fetchCategories = () => ({
  type: SG_FETCH_CATEGORIES,
});

export const fetchProductsDetail = (id) => ({
  type: SG_FETCH_PRODUCT_DETAIL,
  payload: id,
});

export const giveOffer = (id) => ({
  type: SG_GIVE_OFFER,
  payload: id,
});
