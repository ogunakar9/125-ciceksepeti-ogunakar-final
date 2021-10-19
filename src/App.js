import React, { useEffect } from "react";
import "./style/default.scss";
import Index from "./pages";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import AccountDetailsPage from "./pages/AccountDetailsPage";
import ProductDetails from "./pages/ProductDetails";
import {
  checkUserSession,
  fetchCategories,
  fetchProducts,
  fetchGivenOffers,
  fetchReceivedOffers,
  fetchColors,
  fetchBrands,
  fetchStatuses,
} from "./store/actions";
import Header from "./components/Header";
import CreateProduct from "./pages/CreateProduct";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchColors());
    dispatch(fetchBrands());
    dispatch(fetchStatuses());
  }, []);

  useEffect(() => {
    dispatch(fetchGivenOffers());
  }, []);

  useEffect(() => {
    dispatch(fetchReceivedOffers());
  }, []);

  //TODO: introduce private routes & lazy load & suspense

  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route path="/signup">
            <Header />
            <SignUpPage />
          </Route>
          <Route path="/signin">
            <Header />
            <SignInPage />
          </Route>
          <Route path="/account">
            <AccountDetailsPage />
          </Route>
          <Route path="/createproduct">
            <CreateProduct />
          </Route>
          <Route path="/productdetails/:id">
            <ProductDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
