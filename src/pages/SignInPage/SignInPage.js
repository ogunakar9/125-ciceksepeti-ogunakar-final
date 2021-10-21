import React, { useEffect } from "react";
import "./styles.scss";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import UserAuthForm from "../../components/User/UserAuthForm";
import { signIn } from "../../store/actions";

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
    <div>
      <p>Sign in page</p>
      <UserAuthForm action={signIn} />
      <div>
        <p>Dont have an account?</p>
        <Link to="signup">Signup here</Link>
      </div>
    </div>
  );
};

export default SignInPage;
