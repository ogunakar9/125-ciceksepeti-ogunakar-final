import React, { useEffect, Suspense, lazy } from "react";
import "./style/default.scss";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { checkUserSession, fetchProducts } from "./store/actions";
import PrivateRoute from "./components/shared/Auth/ProtectedRoute";

const Index = lazy(() => import("./pages"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const AccountDetailsPage = lazy(() =>
  import("./pages/AccountDetailsPage/AccountDetailsPage")
);
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CreateProduct = lazy(() => import("./pages/CreateProduct/CreateProduct"));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/signin">
            <SignInPage />
          </Route>
          <PrivateRoute component={AccountDetailsPage} path="/account" exact />
          <PrivateRoute component={CreateProduct} path="/createproduct" exact />
          <Route path="/productdetails/:id">
            <ProductDetails />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}
