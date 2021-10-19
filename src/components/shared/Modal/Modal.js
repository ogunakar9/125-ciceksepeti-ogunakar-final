import React from "react";
import "./styles.scss";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";

const Modal = () => {
  const { loading } = useSelector((state) => state.main);
  console.log(loading);

  // if (!props.show) {
  //   return null;
  // }

  if (!loading) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        {/*<div className="modal-header">*/}
        {/*  <h4 className="modal-title">Modal title</h4>*/}
        {/*</div>*/}
        {/*<Loader className="modal-loader" loading={loading} />*/}
        {/*<div className="modal-body">This is modal content</div>*/}
        {/*<div className="modal-footer">*/}
        {/*  <button className="button">Close</button>*/}
        {/*</div>*/}
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default Modal;
