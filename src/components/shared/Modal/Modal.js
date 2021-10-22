import React from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { purchaseProduct, setModal } from "../../../store/actions";

const Modal = () => {
  const dispatch = useDispatch();
  const { isModalOpen, modalContent, productId } = useSelector(
    (state) => state.main
  );
  console.log(isModalOpen);

  if (!isModalOpen) {
    return null;
  }

  const handleModalClose = () => {
    dispatch(
      setModal({
        isModalOpen: false,
        modalContent: null,
        productId: null,
      })
    );
  };

  const handleBuy = () => {
    dispatch(purchaseProduct(productId));
  };

  const buyModalContent = () => {
    return (
      <div className="modal_buy_container">
        <span className="modal_buy_title">Satın Al</span>
        <span className="modal_buy_warning">Satın Almak istiyor musunuz?</span>
        <div>
          <button className="modal_buy_cancel" onClick={handleModalClose}>
            Vazgeç
          </button>
          <button className="modal_buy_accept" onClick={handleBuy}>
            Satın Al
          </button>
        </div>
      </div>
    );
  };

  const offerModalContent = () => {
    return <p>Got a really good offer</p>;
  };

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <IoMdCloseCircle
          className="modal_close_button"
          onClick={handleModalClose}
        />
        {modalContent && modalContent === "buy" && buyModalContent()}
        {modalContent && modalContent === "offer" && offerModalContent()}
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default Modal;
