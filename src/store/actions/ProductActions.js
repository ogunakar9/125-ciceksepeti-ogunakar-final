import {
  SG_FETCH_PRODUCTS,
  SG_FETCH_CATEGORIES,
  SG_FETCH_PRODUCT_DETAIL,
  SG_GIVE_OFFER,
  SG_CREATE_PRODUCT,
  SG_UPLOAD_NEW_PRODUCT_IMAGE,
  SG_PURCHASE_PRODUCT,
  SET_NEW_IMAGE_URL,
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

export const giveOffer = (id, customerOffer) => ({
  type: SG_GIVE_OFFER,
  payload: { id, customerOffer },
});

export const createProduct = (newProduct) => ({
  type: SG_CREATE_PRODUCT,
  payload: newProduct,
});

export const purchaseProduct = (id) => ({
  type: SG_PURCHASE_PRODUCT,
  payload: id,
});

export const uploadNewProductImage = (image) => ({
  type: SG_UPLOAD_NEW_PRODUCT_IMAGE,
  payload: image,
});

export const removeImage = () => ({
  type: SET_NEW_IMAGE_URL,
  payload: "",
});
