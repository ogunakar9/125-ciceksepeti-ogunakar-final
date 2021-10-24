import React, { useEffect } from "react";
import "./styles.scss";
import { signUp } from "../../store/actions";
import UserAuthForm from "../../components/User/UserAuthForm";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  linkTextSignUp,
  signingUpText,
  urlSignUp,
  generalTextSignUp,
} from "../../utilities/Constants";

const SignUpPage = () => {
  const history = useHistory();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  console.log(isSignedIn);
  useEffect(() => {
    if (isSignedIn) {
      history.push("/");
    }
  }, [isSignedIn, history]);

  //TODO: formun sayfanin ortasina gecmesine dikkat et center alignla
  return (
    <UserAuthForm
      action={signUp}
      forwardLocation={urlSignUp}
      helperText={signingUpText}
      linkText={linkTextSignUp}
      generalText={generalTextSignUp}
    />
  );
};

export default SignUpPage;
