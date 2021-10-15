import { SG_FETCH_PRODUCTS } from "../types/ProductTypes";

export const fetchProducts = () => ({
  type: SG_FETCH_PRODUCTS,
});

//TODO: fetch last known product
// export const fetchLastProduct = () => ({
//   type: SG_FETCH_PRODUCTS,
// });
