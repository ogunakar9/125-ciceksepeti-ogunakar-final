import React, { useEffect } from "react";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import UserAuthForm from "../../components/User/UserAuthForm";
import { signIn } from "../../store/actions";
import Notification from "../../components/shared/Notification/Notification";
import errorIcon from "../../assets/auth/errorIcon/errorIcon@2x.png";

const SignInPage = () => {
  const history = useHistory();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  console.log(isSignedIn);
  useEffect(() => {
    if (isSignedIn) {
      history.push("/");
    }
  }, [isSignedIn, history]);

  const text = "Emailinizi veya şifreniz hatalı.";
  // {/*<div>*/}
  // {/*  <p>Dont have an account?</p>*/}
  // {/*  <Link to="signup">Signup here</Link>*/}
  // {/*</div>*/}
  return (
    <>
      <Notification text={text} icon={errorIcon} type={"error"} />
      <UserAuthForm action={signIn} />
    </>
  );
};

export default SignInPage;
