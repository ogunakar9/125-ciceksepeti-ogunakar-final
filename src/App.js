import React, { useEffect } from "react";
import "./default.scss";
import Index from "./pages";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import {
  checkUserSession,
  fetchCategories,
  fetchProducts,
  fetchGivenOffers,
} from "./store/actions";
import Header from "./components/Header";
import AddProduct from "./pages/AddProduct";

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
  }, []);

  useEffect(() => {
    dispatch(fetchGivenOffers());
  }, []);

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
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/addproducts">
            <AddProduct />
          </Route>
          <Route path="/productdetails/:id">
            <ProductDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
