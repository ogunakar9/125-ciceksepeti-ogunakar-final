import { all, takeLatest, call } from "redux-saga/effects";
import { SG_SIGN_UP } from "../types/AuthTypes";
import API from "../../services/api";

function* sgSignUp(action) {
  console.log("Sign Up Saga");

  try {
    const { email, password } = action.payload;

    // const { email, password } = yield select((state) => state.auth);
    const data = { email, password };
    const response = yield call(API.post, "/authorization/signup", data);
    const token = response.token;

    //TODO: yield put(); pass token
  } catch (error) {
    console.error("Sign Up Saga", error.code, error.message);
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

export function* authWatcher() {
  // yield takeLatest(SG_SIGN_IN, sgSignIn);
  yield takeLatest(SG_SIGN_UP, sgSignUp);
  // yield takeLatest(SG_SIGN_OUT, sgSignOut);
}
