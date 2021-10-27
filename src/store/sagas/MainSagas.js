import { all, takeLatest, call, put } from "redux-saga/effects";
import API from "../../services/api";
import {
  SET_BRAND,
  SET_BRANDS,
  SET_COLOR,
  SET_COLORS,
  SET_STATUS,
  SET_STATUSES,
  SG_FETCH_BRAND,
  SG_FETCH_BRANDS,
  SG_FETCH_COLOR,
  SG_FETCH_COLORS,
  SG_FETCH_STATUS,
  SG_FETCH_STATUSES,
} from "../types/MainTypes";

export function* sgFetchColors() {
  try {
    const response = yield call(API.get, "/detail/color/all");

    yield put({
      type: SET_COLORS,
      payload: response.data,
    });
  } catch (error) {}
}

export function* sgFetchBrands() {
  try {
    const response = yield call(API.get, "/detail/brand/all");

    yield put({
      type: SET_BRANDS,
      payload: response.data,
    });
  } catch (error) {
    yield all([]);
  }
}

export function* sgFetchStatuses() {
  try {
    const response = yield call(API.get, "/detail/status/all");

    yield put({
      type: SET_STATUSES,
      payload: response.data,
    });
  } catch (error) {
    yield all([]);
  }
}

export function* sgFetchColor(action) {
  try {
    const id = action.payload;
    const response = yield call(API.get, `/detail/color/${id}`);

    yield put({
      type: SET_COLOR,
      payload: response.data,
    });
  } catch (error) {
    yield all([]);
  }
}

export function* sgFetchBrand(action) {
  try {
    const id = action.payload;
    const response = yield call(API.get, `/detail/brand/${id}`);

    yield put({
      type: SET_BRAND,
      payload: response.data,
    });
  } catch (error) {
    yield all([]);
  }
}

export function* sgFetchStatus(action) {
  try {
    const id = action.payload;
    const response = yield call(API.get, `/detail/status/${id}`);

    yield put({
      type: SET_STATUS,
      payload: response.data,
    });
  } catch (error) {
    yield all([]);
  }
}

export function* mainWatcher() {
  yield takeLatest(SG_FETCH_COLORS, sgFetchColors);
  yield takeLatest(SG_FETCH_BRANDS, sgFetchBrands);
  yield takeLatest(SG_FETCH_STATUSES, sgFetchStatuses);
  yield takeLatest(SG_FETCH_COLOR, sgFetchColor);
  yield takeLatest(SG_FETCH_BRAND, sgFetchBrand);
  yield takeLatest(SG_FETCH_STATUS, sgFetchStatus);
}
