import {
  SET_PRODUCTS,
  SG_FETCH_PRODUCTS,
  SG_FETCH_CATEGORIES,
  SET_CATEGORIES,
  SG_FETCH_PRODUCT_DETAIL,
  SET_PRODUCT_DETAILS,
  SG_GIVE_OFFER,
} from "../types/ProductTypes";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import API from "../../services/api";
import { sgFetchGivenOffers } from "./AccountSagas";

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

function* sgFetchCategories() {
  console.log("Categories Saga");

  try {
    // const data = { email, password };
    const response = yield call(API.get, "/detail/category/all");
    const data = response.data;
    console.log(data);

    // //set local storage and cookie
    // localStorage.setItem(user_token, token);
    // localStorage.setItem(user_mail, email);

    yield put({
      type: SET_CATEGORIES,
      payload: data,
    });
  } catch (error) {
    console.error("Fetch Categories Saga", error.code, error.message);
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

function* sgFetchProductDetail(action) {
  console.log("ProductDetail Saga");

  try {
    const id = action.payload;

    const response = yield call(API.get, `/product/${id}`);
    const data = response.data;
    console.log(data);

    yield call(sgFetchGivenOffers);
    const { givenOffers } = yield select((state) => state.account);
    let offerId = null;
    for (const offer of givenOffers) {
      const {
        product: { id: productId },
        id: oId,
      } = offer;

      if (productId === id) {
        offerId = oId;
      }
    }

    yield put({
      type: SET_PRODUCT_DETAILS,
      payload: { ...data, offerId },
    });
  } catch (error) {
    console.error("ProductDetail Saga", error.code, error.message);
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

function* sgGiveOffer(action) {
  console.log("Give offer Saga");

  try {
    const id = action.payload;
    const { isSignedIn, token } = yield select((state) => state.auth);

    if (!isSignedIn) {
      return;
    }
    const price = {
      offeredPrice: 0,
    };
    const response = yield call(API.post, `/product/offer/${id}`, price, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    yield put({
      type: SG_FETCH_PRODUCT_DETAIL,
      payload: id,
    });
  } catch (error) {
    console.error("ProductDetail Saga", error.code, error.message);
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
  yield takeLatest(SG_FETCH_CATEGORIES, sgFetchCategories);
  yield takeLatest(SG_FETCH_PRODUCT_DETAIL, sgFetchProductDetail);
  yield takeLatest(SG_GIVE_OFFER, sgGiveOffer);
}
