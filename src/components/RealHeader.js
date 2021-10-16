import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const RealHeader = () => {
  const history = useHistory();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  const handleProfile = () => history.push("/profile");
  const handleSignIn = () => history.push("/signin");
  const handleProducts = () => history.push("/createproduct");

  const ProfileButton = () => {
    return isSignedIn ? (
      <button onClick={handleProfile}>hesabim</button>
    ) : (
      <button onClick={handleSignIn}>giris yap</button>
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button onClick={handleProducts}>urun ekle</button>
      <ProfileButton />
    </div>
  );
};

export default RealHeader;
