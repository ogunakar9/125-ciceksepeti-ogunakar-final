import React, { useState } from "react";
import "./styles.scss";
import { useDispatch } from "react-redux";
import authImage from "../../assets/auth/leftSection/leftSectionSm.png";
import handIcon from "../../assets/auth/handIcon/handIcon.png";
import { Link } from "react-router-dom";

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
    <div className="user_main-container">
      <img src={authImage} alt="authImage" className="user_image-container" />
      <div className="user_right_side-container">
        <img src={handIcon} alt="handIcon" />
        <div className="user_form-lower-container">
          <form>
            <div className="user_form_title">
              <span>Üye Ol</span>
            </div>
            <div className="user_form_suggestion">
              <span>Fırsatlardan yararlanmak için üye ol!</span>
            </div>
            <div className="user_form_input-box">
              <label className="user_form_label" htmlFor="email">
                Email:
              </label>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Email"
                required
                value={mail}
                onChange={handleEmail}
              />
            </div>
            <div className="user_form_input-box">
              <label className="user_form_label" htmlFor="password">
                Password:
              </label>
              {isPassValid === false && <p>Please enter a valid password</p>}
              <input
                className="form-input"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
                required
              />
            </div>
            <button className="user_form_button" onClick={handleFormSubmit}>
              Submit
            </button>
            <div className="user_form_got-account">
              <span>
                {/*TODO: reroute to signin or signout*/}
                Hesabın var mı? <Link>Giriş Yap</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAuthForm;
