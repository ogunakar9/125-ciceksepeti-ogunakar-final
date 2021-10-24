import React, { useState } from "react";
import "./styles.scss";
import { useDispatch } from "react-redux";
import authImage from "../../assets/auth/leftSection/leftSectionSm.png";
import handIcon from "../../assets/auth/handIcon/handIcon.png";
import { Link } from "react-router-dom";
import { setNotification } from "../../store/actions";

const UserAuthForm = ({
  action,
  forwardLocation,
  helperText,
  linkText,
  generalText,
}) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [isPassValid, setIsPassValid] = useState(false);
  const [isMailValid, setIsMailValid] = useState(false);
  const [seeUIChange, setSeeUIChange] = useState(false);

  const dispatch = useDispatch();

  const handleEmail = (e) => {
    setMail(e.target.value);
    setSeeUIChange(false);
    if (e.target.value.includes("@") && e.target.value.includes(".")) {
      setIsMailValid(true);
    } else {
      setIsMailValid(false);
    }
  };

  const handlePassword = (e) => {
    const passwordLength = e.target.value.length;
    setPassword(e.target.value);
    setSeeUIChange(false);
    //check if password is of desired length
    if (passwordLength > 7 && passwordLength < 21) {
      setIsPassValid(true);
    } else if (passwordLength > 0) {
      setIsPassValid(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!isPassValid || !isMailValid) {
      setSeeUIChange(true);
      dispatch(setNotification(true));
    } else {
      dispatch(action(mail, password));
    }
  };

  return (
    <div className="user_main-container">
      <img src={authImage} alt="authImage" className="user_image-container" />
      <div className="user_right_side-container">
        <img src={handIcon} alt="handIcon" />
        <div className="user_form-lower-container">
          <form>
            <div className="user_form_title">
              <span>{generalText}</span>
            </div>
            <div className="user_form_suggestion">
              <span>
                Fırsatlardan yararlanmak için{" "}
                <span style={{ textTransform: "lowercase" }}>
                  {generalText}
                </span>
                !
              </span>
            </div>
            <div className="user_form_input-box">
              <label className="user_form_label" htmlFor="email">
                Email:
              </label>
              <input
                className={`form-input ${
                  seeUIChange && !isMailValid && "form_input-wrong"
                }`}
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
              <input
                className={`form-input ${
                  seeUIChange && !isPassValid && "form_input-wrong"
                }`}
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
                required
              />
            </div>
            <button className="user_form_button" onClick={handleFormSubmit}>
              {generalText}
            </button>
            <div className="user_form_account-helper-text">
              <span>
                {helperText}{" "}
                <Link
                  className="user_form_account_helper-link"
                  to={forwardLocation}
                >
                  {linkText}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAuthForm;
