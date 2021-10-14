import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import mainReducer from "./MainReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  main: mainReducer,
});

export default rootReducer;
