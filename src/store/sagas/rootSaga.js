import { all } from "redux-saga/effects";
import { authWatcher } from "./AuthSagas";
import { productWatcher } from "./ProductSagas";
import { accountWatcher } from "./AccountSagas";
import { mainWatcher } from "./MainSagas";

export default function* rootSaga() {
  yield all([authWatcher(), productWatcher(), accountWatcher(), mainWatcher()]);
}
