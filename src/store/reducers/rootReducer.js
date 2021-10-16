import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import mainReducer from "./MainReducer";
import productReducer from "./ProductReducer";
import accountReducer from "./AccountReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  main: mainReducer,
  products: productReducer,
  account: accountReducer,
});

export default rootReducer;
