import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { signUp } from "../store/actions";

const SignUpPage = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleEmail = (e) => {
    setMail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(signUp(mail, password));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={mail}
          onChange={handleEmail}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
          required
        />
        <br />
        <button onClick={handleFormSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default SignUpPage;
