import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../store/actions";

const Header = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div style={{ width: "100%" }}>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Header;
