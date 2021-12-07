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
import { sgFetchGivenOffers, sgFetchReceivedOffers } from "./AccountSagas";
import { SG_FETCH_GIVEN_OFFERS } from "../types/AccountTypes";
import { SET_LOADING, SET_MODAL, SET_NOTIFICATION } from "../types/MainTypes";

function* sgFetchProducts() {
  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });
    const response = yield call(API.get, "/product/all");
    const data = response.data;

    yield put({
      type: SET_PRODUCTS,
      payload: data,
    });

    yield call(sgFetchCategories);
    yield call(sgFetchGivenOffers);
    yield call(sgFetchReceivedOffers);

    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  }
}

function* sgFetchCategories() {
  try {
    const response = yield call(API.get, "/detail/category/all");
    const data = response.data;

    yield put({
      type: SET_CATEGORIES,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  }
}

function* sgFetchProductDetail(action) {
  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });
    const id = action.payload;

    const response = yield call(API.get, `/product/${id}`);
    const data = response.data;

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
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  }
}

function* sgGiveOffer(action) {
  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });
    const { id, customerOffer } = action.payload;
    const { isSignedIn, token } = yield select((state) => state.auth);

    if (!isSignedIn) {
      return;
    }

    const price = {
      offeredPrice: customerOffer,
    };

    yield call(API.post, `/product/offer/${id}`, price, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put({
      type: SG_FETCH_PRODUCT_DETAIL,
      payload: id,
    });

    yield put({
      type: SET_MODAL,
      payload: { isModalOpen: false, modalContent: null },
    });

    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    console.error("ProductDetail Saga", error.code, error.message);
    yield put({
      type: SET_MODAL,
      payload: { isModalOpen: false, modalContent: null },
    });
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  }
}

function* sgCreateProduct(action) {
  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });
    const { isSignedIn, token } = yield select((state) => state.auth);

    if (!isSignedIn) {
      return;
    }

    const { history, newProduct } = action.payload;

    const { newImageUrl } = yield select((state) => state.products);
    const data = { ...newProduct, imageUrl: newImageUrl };
    yield call(API.post, "/product/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield call(sgFetchProducts);
    history.push("/");
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  }
}

function* sgPurchaseProduct(action) {
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
    const id = action.payload;
    yield call(
      API.put,
      `/product/purchase/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

    yield put({
      type: SET_MODAL,
      payload: { isModalOpen: false, modalContent: null },
    });

    yield put({
      type: SET_NOTIFICATION,
      payload: true,
    });
  } catch (error) {
    console.error("Create product Saga", error.code, error.message);
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
    yield put({
      type: SET_MODAL,
      payload: { isModalOpen: false, modalContent: null },
    });
  }
}

function* sgUploadNewProductImage(action) {
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
    const formData = new FormData();
    formData.append("file", image);
    const response = yield call(API.post, "/file/upload/image", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "multipart/form-data",
      },
    });

    yield put({
      type: SET_NEW_IMAGE_URL,
      payload: response.data.url,
    });

    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
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
