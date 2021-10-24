import React, { useEffect } from "react";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import UserAuthForm from "../../components/User/UserAuthForm";
import { signIn } from "../../store/actions";
import Notification from "../../components/shared/Notification/Notification";
import errorIcon from "../../assets/auth/errorIcon/errorIcon@2x.png";
import {
  urlSignIn,
  signingInText,
  errorText,
  linkTextSignIn,
  generalTextSignIn,
} from "../../utilities/Constants";

const SignInPage = () => {
  const history = useHistory();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  console.log(isSignedIn);
  useEffect(() => {
    if (isSignedIn) {
      history.push("/");
    }
  }, [isSignedIn, history]);

  return (
    <>
      <Notification text={errorText} icon={errorIcon} type={"error"} />
      <UserAuthForm
        action={signIn}
        forwardLocation={urlSignIn}
        helperText={signingInText}
        linkText={linkTextSignIn}
        generalText={generalTextSignIn}
      />
    </>
  );
};

export default SignInPage;
