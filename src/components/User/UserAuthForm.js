import React, { useState } from "react";
import { useDispatch } from "react-redux";

const UserAuthForm = ({ action }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassValid, setIsPassValid] = useState(null);
  const dispatch = useDispatch();

  const handleEmail = (e) => {
    setMail(e.target.value);
  };

  const handlePassword = (e) => {
    const passwordLength = e.target.value.length;

    //check if password is of desired length
    setPassword(e.target.value);
    if (passwordLength > 7 && passwordLength < 21) {
      setIsPassValid(true);
    } else if (passwordLength > 0) {
      setIsPassValid(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(action(mail, password));
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
        {isPassValid === false && <p>Please enter a valid password</p>}
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

export default UserAuthForm;
