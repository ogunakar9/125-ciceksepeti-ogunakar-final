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
  console.log("fetch color Saga");
  try {
    const response = yield call(API.get, "/detail/color/all");
    console.log("account response", response);

    yield put({
      type: SET_COLORS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    yield all([]);
  }
}

export function* sgFetchBrands() {
  console.log("fetch color Saga");
  try {
    const response = yield call(API.get, "/detail/brand/all");
    console.log("account response", response);

    yield put({
      type: SET_BRANDS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    yield all([]);
  }
}

export function* sgFetchStatuses() {
  console.log("fetch status Saga");
  try {
    const response = yield call(API.get, "/detail/status/all");
    console.log("account response", response);

    yield put({
      type: SET_STATUSES,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    yield all([]);
  }
}

export function* sgFetchColor(action) {
  console.log("fetch color Saga");
  try {
    const id = action.payload;
    const response = yield call(API.get, `/detail/color/${id}`);
    console.log("account response", response);

    yield put({
      type: SET_COLOR,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    yield all([]);
  }
}

export function* sgFetchBrand(action) {
  console.log("fetch color Saga");
  try {
    const id = action.payload;
    const response = yield call(API.get, `/detail/brand/${id}`);
    console.log("account response", response);

    yield put({
      type: SET_BRAND,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    yield all([]);
  }
}

export function* sgFetchStatus(action) {
  console.log("fetch status Saga");
  try {
    const id = action.payload;
    const response = yield call(API.get, `/detail/status/${id}`);
    console.log("account response", response);

    yield put({
      type: SET_STATUS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
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
