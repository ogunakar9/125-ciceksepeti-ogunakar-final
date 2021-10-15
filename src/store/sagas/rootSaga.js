import { all } from "redux-saga/effects";
import { authWatcher } from "./AuthSagas";
import { productWatcher } from "./ProductSagas";

export default function* rootSaga() {
  yield all([authWatcher(), productWatcher()]);
}
