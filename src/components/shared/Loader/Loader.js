import React from "react";
import "./Loader.scss";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";

const LoaderComponent = () => {
  const loading = useSelector((state) => state.main.loading);
  if (!loading) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="loader-wrapper">
      <Loader
        type="Oval"
        color="black"
        height={100}
        width={100}
        visible={loading}
      />
    </div>,
    document.getElementById("root")
  );
};

export default LoaderComponent;
