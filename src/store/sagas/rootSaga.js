import { all } from "redux-saga/effects";
import { authWatcher } from "./AuthSagas";

export default function* rootSaga() {
  yield all([authWatcher()]);
}
