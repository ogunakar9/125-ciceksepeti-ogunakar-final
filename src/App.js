import React, { useEffect } from "react";
import "./default.scss";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { checkUserSession } from "./store/actions";
import Header from "./components/Header";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="/signup">
            <Header />
            <SignUpPage />
          </Route>
          <Route path="/signin">
            <Header />
            <SignInPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
