import React, { useEffect } from "react";
import RealHeader from "../components/RealHeader";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Account = () => {
  const history = useHistory();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  console.log(isSignedIn);
  useEffect(() => {
    if (!isSignedIn) {
      history.push("/signin");
    }
  }, [isSignedIn]);

  const email = useSelector((state) => state.auth.email);
  console.log(email);
  return (
    <div>
      <RealHeader />
      <div style={{ width: "100%", height: "20%" }}>{email}</div>
      <h1>this is my profile</h1>
    </div>
  );
};

export default Account;
