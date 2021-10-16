import {
  SG_FETCH_PRODUCTS,
  SG_FETCH_CATEGORIES,
  SG_FETCH_PRODUCT_DETAIL,
  SG_GIVE_OFFER,
  SG_CREATE_PRODUCT,
  SG_UPLOAD_NEW_PRODUCT_IMAGE,
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

export const createProduct = () => ({
  type: SG_CREATE_PRODUCT,
});

export const uploadNewProductImage = (image) => ({
  type: SG_UPLOAD_NEW_PRODUCT_IMAGE,
  payload: image,
});
