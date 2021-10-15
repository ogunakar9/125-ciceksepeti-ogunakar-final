import { SET_PRODUCTS, SG_FETCH_PRODUCTS } from "../types/ProductTypes";
import { all, call, put, takeLatest } from "redux-saga/effects";
import API from "../../services/api";

//TODO: selectedCategory function

function* sgFetchProducts() {
  console.log("Products Saga");

  try {
    // const data = { email, password };
    const response = yield call(API.get, "/product/all");
    const data = response.data;
    console.log(data);

    // //set local storage and cookie
    // localStorage.setItem(user_token, token);
    // localStorage.setItem(user_mail, email);

    yield put({
      type: SET_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    console.error("Fetch Products Saga", error.code, error.message);
    //TODO: show error message here
    yield all([
      // put({
      //   type: SET_SNACKBAR_OPEN,
      //   payload: true,
      // }),
      // put({
      //   type: SET_SNACKBAR_MESSAGE,
      //   payload: error.message,
      // }),
    ]);
  }
}

export function* productWatcher() {
  yield takeLatest(SG_FETCH_PRODUCTS, sgFetchProducts);
}
