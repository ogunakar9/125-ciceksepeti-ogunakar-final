import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "./store/reducers/rootReducer";
import rootSaga from "./store/sagas/rootSaga";

// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();

const REDUX_LOGGER = false;
const logger = createLogger({
  predicate: () => REDUX_LOGGER,
});

// Redux: Store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
