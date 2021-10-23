import React from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { GrClose } from "react-icons/gr";
import { giveOffer, purchaseProduct, setModal } from "../../../store/actions";

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

  const handleOffer = () => {
    dispatch(giveOffer(productId));
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
    return (
      <div className="modal_offer_container">
        <GrClose
          className="modal_close_offer_button"
          onClick={handleModalClose}
        />
        <div className="modal_offer_title">
          <span>Teklif Ver</span>
        </div>
        <div className="modal_offer_info">It eeez what it eeez</div>
        <div className="modal_offer_inputs-wrapper">
          <div className="modal_offer_input-single-container">
            <input type="radio" id="twenty" name="twenty" value={20} />
            <label htmlFor="twenty">%20’si Kadar Teklif Ver</label>
          </div>
          <div className="modal_offer_input-single-container">
            <input type="radio" id="twenty" name="twenty" value={20} />
            <label htmlFor="twenty">%20’si Kadar Teklif Ver</label>
          </div>
          <div className="modal_offer_input-single-container">
            <input type="radio" id="twenty" name="twenty" value={20} />
            <label htmlFor="twenty">%20’si Kadar Teklif Ver</label>
          </div>
          <div className="modal_offer_input-custom-container">
            <input
              type="text"
              id="custom"
              name="custom"
              placeholder="Teklif Belirle"
            />
            <span>TL</span>
          </div>
        </div>
        <button className="modal_offer_submit-button" onClick={handleOffer}>
          Onayla
        </button>
      </div>
    );
  };

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        {modalContent && modalContent === "buy" && buyModalContent()}
        {modalContent && modalContent === "offer" && offerModalContent()}
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default Modal;
