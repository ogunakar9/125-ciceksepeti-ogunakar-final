import React, { useEffect } from "react";
import "./style/default.scss";
import Index from "./pages";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import AccountDetailsPage from "./pages/AccountDetailsPage/AccountDetailsPage";
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
import Header2 from "./components/Header2";
import CreateProduct from "./pages/CreateProduct/CreateProduct";

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
    dispatch(fetchColors());
    dispatch(fetchBrands());
    dispatch(fetchStatuses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGivenOffers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReceivedOffers());
  }, [dispatch]);

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
            <Header2 />
            <SignUpPage />
          </Route>
          <Route path="/signin">
            <Header2 />
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
