import {
  SG_FETCH_BRANDS,
  SG_FETCH_COLORS,
  SG_FETCH_STATUSES,
  SG_FETCH_COLOR,
  SG_FETCH_BRAND,
  SG_FETCH_STATUS,
} from "../types/MainTypes";

export const fetchColors = () => ({
  type: SG_FETCH_COLORS,
});

export const fetchBrands = () => ({
  type: SG_FETCH_BRANDS,
});

export const fetchStatuses = () => ({
  type: SG_FETCH_STATUSES,
});

export const fetchColor = (id) => ({
  type: SG_FETCH_COLOR,
  payload: id,
});

export const fetchBrand = (id) => ({
  type: SG_FETCH_BRAND,
  payload: id,
});

export const fetchStatus = (id) => ({
  type: SG_FETCH_STATUS,
  payload: id,
});
