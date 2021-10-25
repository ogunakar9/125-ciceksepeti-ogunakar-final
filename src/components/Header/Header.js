import React from "react";
import "./styles.scss";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
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
      <Link className="banner-logo_container" to={"/"}>
        <img src={bannerLogo} alt="ikinci-el" />
      </Link>
      <div className="header_button-wrapper">
        <div className="header_button_width-fixer">
          <button
            className="header-button header_button_create-btn-sm"
            onClick={handleProducts}
          >
            <img src={plusIcon} alt="plus-icon" />
            <span className="header_plus-only">Ürün Ekle</span>
          </button>
        </div>
        <div>
          <ProfileButton
            className={`header-button header_button_profile-btn-sm`}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
