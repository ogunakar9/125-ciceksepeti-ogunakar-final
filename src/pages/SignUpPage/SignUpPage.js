import React, { useEffect } from "react";
import "./styles.scss";
import { signUp } from "../../store/actions";
import UserAuthForm from "../../components/User/UserAuthForm";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { signUpFormContent, errorText } from "../../utilities/Constants";
import errorIcon from "../../assets/auth/errorIcon/errorIcon@2x.png";
import Notification from "../../components/shared/Notification/Notification";

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
    <>
      <Notification text={errorText} icon={errorIcon} type={"error"} />
      <UserAuthForm action={signUp} formContent={signUpFormContent} />
    </>
  );
};

export default SignUpPage;
