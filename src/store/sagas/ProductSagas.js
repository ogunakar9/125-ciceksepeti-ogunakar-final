import {
  SET_PRODUCTS,
  SG_FETCH_PRODUCTS,
  SG_FETCH_CATEGORIES,
  SET_CATEGORIES,
  SG_FETCH_PRODUCT_DETAIL,
  SET_PRODUCT_DETAILS,
  SG_GIVE_OFFER,
  SG_CREATE_PRODUCT,
  SG_UPLOAD_NEW_PRODUCT_IMAGE,
  SET_NEW_IMAGE_URL,
  SG_PURCHASE_PRODUCT,
} from "../types/ProductTypes";
import { call, put, select, takeLatest } from "redux-saga/effects";
import API from "../../services/api";
import { sgFetchGivenOffers } from "./AccountSagas";
import { SG_FETCH_GIVEN_OFFERS } from "../types/AccountTypes";
import { SET_LOADING } from "../types/MainTypes";

function* sgFetchProducts() {
  console.log("Products Saga");

  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });
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
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    console.error("Fetch Products Saga", error.code, error.message);
    //TODO: show error message here
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
    // put({
    //   type: SET_SNACKBAR_OPEN,
    //   payload: true,
    // }),
    // put({
    //   type: SET_SNACKBAR_MESSAGE,
    //   payload: error.message,
    // }),
  }
}

function* sgFetchCategories() {
  console.log("Categories Saga");

  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });
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

    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    console.error("Fetch Categories Saga", error.code, error.message);
    //TODO: show error message here
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
    // put({
    //   type: SET_SNACKBAR_OPEN,
    //   payload: true,
    // }),
    // put({
    //   type: SET_SNACKBAR_MESSAGE,
    //   payload: error.message,
    // }),
  }
}

function* sgFetchProductDetail(action) {
  console.log("ProductDetail Saga");

  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });
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
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    console.error("ProductDetail Saga", error.code, error.message);
    //TODO: show error message here
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
    // put({
    //   type: SET_SNACKBAR_OPEN,
    //   payload: true,
    // }),
    // put({
    //   type: SET_SNACKBAR_MESSAGE,
    //   payload: error.message,
    // }),
  }
}

function* sgGiveOffer(action) {
  console.log("Give offer Saga");

  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });
    const id = action.payload;
    const { isSignedIn, token } = yield select((state) => state.auth);

    if (!isSignedIn) {
      return;
    }
    //TODO: accept offeredPrice from component
    const price = {
      offeredPrice: 50,
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

    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    console.error("ProductDetail Saga", error.code, error.message);
    //TODO: show error message here
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
    // put({
    //   type: SET_SNACKBAR_OPEN,
    //   payload: true,
    // }),
    // put({
    //   type: SET_SNACKBAR_MESSAGE,
    //   payload: error.message,
    // }),
  }
}

function* sgCreateProduct(action) {
  console.log("Create Product Saga");

  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });
    const { isSignedIn, token } = yield select((state) => state.auth);

    if (!isSignedIn) {
      return;
    }

    const { newImageUrl } = yield select((state) => state.products);
    const data = { ...action.payload, imageUrl: newImageUrl };
    const response = yield call(API.post, "/product/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    // yield put({
    //   type: SG_FETCH_PRODUCT_DETAIL,
    // });
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    console.error("Create product Saga", error.code, error.message);
    //TODO: show error message here
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
    // put({
    //   type: SET_SNACKBAR_OPEN,
    //   payload: true,
    // }),
    // put({
    //   type: SET_SNACKBAR_MESSAGE,
    //   payload: error.message,
    // }),
  }
}

function* sgPurchaseProduct(action) {
  console.log("Purchase Product Saga");

  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });
    const { isSignedIn, token } = yield select((state) => state.auth);
    console.log(isSignedIn);

    if (!isSignedIn) {
      yield put({
        type: SET_LOADING,
        payload: { loading: false },
      });
      return;
    }
    const id = action.payload;
    const response = yield call(
      API.put,
      `/product/purchase/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    yield put({
      type: SG_FETCH_GIVEN_OFFERS,
    });

    yield put({
      type: SG_FETCH_PRODUCT_DETAIL,
      payload: id,
    });

    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    console.error("Create product Saga", error.code, error.message);
    //TODO: show error message here
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
    // put({
    //   type: SET_SNACKBAR_OPEN,
    //   payload: true,
    // }),
    // put({
    //   type: SET_SNACKBAR_MESSAGE,
    //   payload: error.message,
    // }),
  }
}

function* sgUploadNewProductImage(action) {
  console.log("Upload New Product Image Saga");

  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });
    const { isSignedIn, token } = yield select((state) => state.auth);

    if (!isSignedIn) {
      yield put({
        type: SET_LOADING,
        payload: { loading: false },
      });
      return;
    }

    const image = action.payload;
    console.log("image saga", image);
    const formData = new FormData();
    formData.append("file", image);
    console.log(formData);
    const response = yield call(API.post, "/file/upload/image", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "multipart/form-data",
      },
    });

    console.log("image upload url", response);

    yield put({
      type: SET_NEW_IMAGE_URL,
      payload: response.data.url,
    });

    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    console.error("Upload New Product Image Saga", error.code, error.message);
    //TODO: show error message here
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
    // put({
    //   type: SET_SNACKBAR_OPEN,
    //   payload: true,
    // }),
    // put({
    //   type: SET_SNACKBAR_MESSAGE,
    //   payload: error.message,
    // }),
  }
}

export function* productWatcher() {
  yield takeLatest(SG_FETCH_PRODUCTS, sgFetchProducts);
  yield takeLatest(SG_FETCH_CATEGORIES, sgFetchCategories);
  yield takeLatest(SG_FETCH_PRODUCT_DETAIL, sgFetchProductDetail);
  yield takeLatest(SG_GIVE_OFFER, sgGiveOffer);
  yield takeLatest(SG_CREATE_PRODUCT, sgCreateProduct);
  yield takeLatest(SG_PURCHASE_PRODUCT, sgPurchaseProduct);
  yield takeLatest(SG_UPLOAD_NEW_PRODUCT_IMAGE, sgUploadNewProductImage);
}
