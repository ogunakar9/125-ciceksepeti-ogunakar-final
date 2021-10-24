import { takeLatest, call, put } from "redux-saga/effects";
import {
  SET_USER,
  SG_SIGN_UP,
  SG_SIGN_IN,
  SG_CHECK_SESSION,
  SG_SIGN_OUT,
  SIGN_OUT,
} from "../types/AuthTypes";
import API from "../../services/api";
import { user_token, user_mail } from "../../utilities/Constants";
import { SET_LOADING, SET_NOTIFICATION } from "../types/MainTypes";
import { sgFetchGivenOffers, sgFetchReceivedOffers } from "./AccountSagas";

function* sgSignUp(action) {
  console.log("Sign Up Saga");

  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });
    const { email, password } = action.payload;

    const data = { email, password };
    const response = yield call(API.post, "/authorization/signup", data);
    const token = response.data.access_token;

    //set local storage and cookie
    localStorage.setItem(user_token, token);
    localStorage.setItem(user_mail, email);

    yield put({
      type: SET_USER,
      payload: { token, email, isSignedIn: true },
    });
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    console.error("Sign Up Saga", error.code, error.message);
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
    yield put({
      type: SET_NOTIFICATION,
      payload: true,
    });
  }
}

function* sgSignIn(action) {
  console.log("Sign in Saga");
  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });
    const { email, password } = action.payload;

    const data = { email, password };
    const response = yield call(API.post, "/authorization/signin", data);
    const token = response.data.access_token;

    //set local storage and cookie
    localStorage.setItem(user_token, token);
    localStorage.setItem(user_mail, email);

    yield put({
      type: SET_USER,
      payload: { token, email, isSignedIn: true },
    });
    yield call(sgFetchReceivedOffers);
    yield call(sgFetchGivenOffers);
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
  } catch (error) {
    console.error("Sign In Saga", error.code, error.message);
    //TODO: show error message here
    yield put({
      type: SET_LOADING,
      payload: { loading: false },
    });
    yield put({
      type: SET_NOTIFICATION,
      payload: true,
    });
  }
}

export function* sgSignOut() {
  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });
    localStorage.clear();
    yield put({
      type: SIGN_OUT,
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

export function* sgCheckUserSession() {
  console.log("checking login");
  try {
    yield put({
      type: SET_LOADING,
      payload: { loading: true },
    });

    const existingToken = localStorage.getItem(user_token);
    const existingMail = localStorage.getItem(user_mail);

    if (existingToken && existingMail) {
      yield put({
        type: SET_USER,
        payload: {
          token: existingToken,
          email: existingMail,
          isSignedIn: true,
        },
      });
    }

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

export function* authWatcher() {
  yield takeLatest(SG_SIGN_IN, sgSignIn);
  yield takeLatest(SG_SIGN_UP, sgSignUp);
  yield takeLatest(SG_CHECK_SESSION, sgCheckUserSession);
  yield takeLatest(SG_SIGN_OUT, sgSignOut);
}
