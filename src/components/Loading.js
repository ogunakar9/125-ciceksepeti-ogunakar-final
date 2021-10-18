import React from "react";
import Loader from "react-loader-spinner";
// import { useSelector } from "react-redux";

const Loading = ({ loading }) => {
  // const loading = useSelector((state) => state.main.loading);

  return (
    <div>
      <Loader
        type="Oval"
        color="#00BFFF"
        height={100}
        width={100}
        visible={loading}
      />
    </div>
  );
};

export default Loading;
