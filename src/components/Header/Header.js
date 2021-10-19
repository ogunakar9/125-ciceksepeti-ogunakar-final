import React from "react";
import "./styles.scss";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import bannerLogo from "../../assets/header/hand-signSM.svg";
import plusIcon from "../../assets/header/plus-icon.svg";
import profileIcon from "../../assets/header/profile-icon.svg";

const Header = () => {
  const history = useHistory();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  const handleProfile = () => history.push("/account");
  const handleSignIn = () => history.push("/signin");
  const handleProducts = () => history.push("/createproduct");

  const ProfileButton = ({ className }) => {
    return (
      <>
        {isSignedIn && (
          <button onClick={handleProfile} className={className}>
            <img src={profileIcon} alt="plus-icon" />
            <span>Hesabım</span>
          </button>
        )}
        {!isSignedIn && (
          <button onClick={handleSignIn} className={className}>
            <img src={profileIcon} alt="profile-icon" />
            <span>Giriş Yap</span>
          </button>
        )}
      </>
    );
  };

  return (
    <header className="header-wrapper">
      <div className="banner-logo_container">
        <img src={bannerLogo} alt="ikinci-el" />
      </div>
      <div className="header_button-wrapper">
        <div>
          <button className="header-button" onClick={handleProducts}>
            <img src={plusIcon} alt="plus-icon" />
            <span>Ürün Ekle</span>
          </button>
        </div>
        <div>
          <ProfileButton className="header-button" />
        </div>
      </div>
    </header>
  );
};

export default Header;
