import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import mainReducer from "./MainReducer";
import productReducer from "./ProductReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  main: mainReducer,
  products: productReducer,
});

export default rootReducer;
