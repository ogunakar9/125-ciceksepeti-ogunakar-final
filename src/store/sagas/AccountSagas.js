import { takeLatest, call, put, select } from "redux-saga/effects";
import {
  SET_GIVEN_OFFERS,
  SET_RECEIVED_OFFERS,
  SG_ACCEPT_OFFER,
  SG_CANCEL_OFFER,
  SG_FETCH_GIVEN_OFFERS,
  SG_FETCH_RECEIVED_OFFERS,
  SG_REJECT_OFFER,
} from "../types/AccountTypes";
import API from "../../services/api";
import { SG_FETCH_PRODUCT_DETAIL } from "../types/ProductTypes";
import { SET_LOADING } from "../types/MainTypes";

export function* sgFetchGivenOffers() {
  console.log("profile Saga");
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

    const response = yield call(API.get, "/account/given-offers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("account response", response);

    yield put({
      type: SET_GIVEN_OFFERS,
      payload: response.data,
    });
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  }
}

export function* sgFetchReceivedOffers() {
  console.log("received offer Saga");
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

    const response = yield call(API.get, "/account/received-offers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("account response", response);

    yield put({
      type: SET_RECEIVED_OFFERS,
      payload: response.data,
    });
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  }
}

export function* sgRejectOffer(action) {
  console.log("reject offer Saga");
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

    const response = yield call(
      API.post,
      `/account/reject-offer/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    yield put({
      type: SG_FETCH_RECEIVED_OFFERS,
    });
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  }
}

export function* sgAcceptOffer(action) {
  console.log("accept offer Saga");
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

    const response = yield call(
      API.put,
      `/account/accept-offer/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    yield put({
      type: SG_FETCH_RECEIVED_OFFERS,
    });
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  }
}

export function* sgCancelOffer(action) {
  console.log("cancel offer Saga");
  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });
    const { isSignedIn, token } = yield select((state) => state.auth);
    const { productId, offerId } = action.payload;

    if (!isSignedIn) {
      yield put({
        type: SET_LOADING,
        payload: { loading: false },
      });
      return;
    }

    const response = yield call(
      API.delete,
      `/account/cancel-offer/${offerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("account response", response);

    yield put({
      type: SG_FETCH_PRODUCT_DETAIL,
      payload: productId,
    });
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  }
}

export function* accountWatcher() {
  yield takeLatest(SG_FETCH_GIVEN_OFFERS, sgFetchGivenOffers);
  yield takeLatest(SG_FETCH_RECEIVED_OFFERS, sgFetchReceivedOffers);
  yield takeLatest(SG_REJECT_OFFER, sgRejectOffer);
  yield takeLatest(SG_ACCEPT_OFFER, sgAcceptOffer);
  yield takeLatest(SG_CANCEL_OFFER, sgCancelOffer);
}
