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

    yield put({
      type: SET_GIVEN_OFFERS,
      payload: response.data,
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

export function* sgFetchReceivedOffers() {
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

    yield put({
      type: SET_RECEIVED_OFFERS,
      payload: response.data,
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

export function* sgRejectOffer(action) {
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
      API.post,
      `/account/reject-offer/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put({
      type: SG_FETCH_RECEIVED_OFFERS,
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

export function* sgAcceptOffer(action) {
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
      `/account/accept-offer/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put({
      type: SG_FETCH_RECEIVED_OFFERS,
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

export function* sgCancelOffer(action) {
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

    yield call(API.delete, `/account/cancel-offer/${offerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put({
      type: SG_FETCH_PRODUCT_DETAIL,
      payload: productId,
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

export function* accountWatcher() {
  yield takeLatest(SG_FETCH_GIVEN_OFFERS, sgFetchGivenOffers);
  yield takeLatest(SG_FETCH_RECEIVED_OFFERS, sgFetchReceivedOffers);
  yield takeLatest(SG_REJECT_OFFER, sgRejectOffer);
  yield takeLatest(SG_ACCEPT_OFFER, sgAcceptOffer);
  yield takeLatest(SG_CANCEL_OFFER, sgCancelOffer);
}
