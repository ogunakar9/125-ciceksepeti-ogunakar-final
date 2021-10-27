import React, { useEffect } from "react";
import "./style/default.scss";
import Index from "./pages";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import AccountDetailsPage from "./pages/AccountDetailsPage/AccountDetailsPage";
import ProductDetails from "./pages/ProductDetails";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import {
  checkUserSession,
  fetchCategories,
  fetchProducts,
  fetchGivenOffers,
  fetchReceivedOffers,
} from "./store/actions";
import PrivateRoute from "./components/shared/Auth/ProtectedRoute";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGivenOffers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReceivedOffers());
  }, [dispatch]);

  return (
    <Router>
      <div>
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
      </div>
    </Router>
  );
}
