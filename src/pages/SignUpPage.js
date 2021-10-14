import React, { useEffect } from "react";

import { signUp } from "../store/actions";
import UserAuthForm from "../components/UserAuthForm";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUpPage = () => {
  const history = useHistory();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  console.log(isSignedIn);
  useEffect(() => {
    if (isSignedIn) {
      history.push("/");
    }
  }, [isSignedIn]);

  return <UserAuthForm action={signUp} />;
};

export default SignUpPage;
