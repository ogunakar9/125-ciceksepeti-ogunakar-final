import React, { useEffect } from "react";
import "./default.scss";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

export default function App() {
  const email = useSelector((state) => state.auth.email);

  useEffect(() => {
    console.log("email", email);
    //TODO: get token from local storage
  }, [email]);
  return (
    <>
      <Home />
    </>
  );
}
