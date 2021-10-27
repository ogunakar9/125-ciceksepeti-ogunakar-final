import React, { useEffect } from "react";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import UserAuthForm from "../../components/User/UserAuthForm";
import { signIn } from "../../store/actions";
import Notification from "../../components/shared/Notification/Notification";
import errorIcon from "../../assets/auth/errorIcon/errorIcon@2x.png";
import { errorText, signInFormContent } from "../../utilities/Constants";

const SignInPage = () => {
  const history = useHistory();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/");
    }
  }, [isSignedIn, history]);

  return (
    <>
      <Notification text={errorText} icon={errorIcon} type={"error"} />
      <UserAuthForm action={signIn} formContent={signInFormContent} />
    </>
  );
};

export default SignInPage;
