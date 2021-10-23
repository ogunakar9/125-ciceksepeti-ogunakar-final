import React, { useState } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { GrClose } from "react-icons/gr";
import { giveOffer, purchaseProduct, setModal } from "../../../store/actions";

const Modal = ({ productDetails }) => {
  const dispatch = useDispatch();
  const { isModalOpen, modalContent } = useSelector((state) => state.main);

  if (!isModalOpen) {
    return null;
  }

  const { imageUrl, title, price, id: productId } = productDetails;

  const handleModalClose = () => {
    dispatch(
      setModal({
        isModalOpen: false,
        modalContent: null,
      })
    );
  };

  const handleBuy = () => {
    dispatch(purchaseProduct(productId));
  };

  const handleOffer = (customerOffer) => {
    dispatch(giveOffer(productId, customerOffer));
  };

  const BuyModalContent = () => {
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

  const OfferModalContent = () => {
    const [customOffer, setCustomOffer] = useState("");
    const [offerTogo, setOfferTogo] = useState(null);

    const calculatePercentage = (initialVal, percentage) => {
      return (initialVal * percentage) / 100;
    };

    const twentyPercent = () => calculatePercentage(price, 20);
    const thirtyPercent = () => calculatePercentage(price, 30);
    const fortyPercent = () => calculatePercentage(price, 40);

    // console.log(offerTogo);

    const handleCustomInput = (e) => {
      //TODO: handle input checks here
      setCustomOffer(e.target.value);
      setOfferTogo(parseInt(e.target.value));
    };

    return (
      <div className="modal_offer_container">
        <GrClose
          className="modal_close_offer_button"
          onClick={handleModalClose}
        />
        <div className="modal_offer_title">
          <span>Teklif Ver</span>
        </div>
        <div className="modal_offer_info">
          <div className="modal_offer_info_left-section">
            <img
              className="modal_offer_info_img"
              src={imageUrl}
              alt="offer-item"
            />
            <div className="modal_offer_info_title">
              <span>{title}</span>
            </div>
          </div>
          <div className="modal_offer_info_price">
            <span>{price} TL</span>
          </div>
        </div>
        <div className="modal_offer_inputs-wrapper">
          <div className="modal_offer_input-single-container">
            {/*TODO: fix inputs not working */}
            <input
              type="radio"
              id="twenty"
              name="percentage-offer"
              value={twentyPercent()}
              onChange={() => setOfferTogo(twentyPercent)}
            />
            <label htmlFor="twenty">%20’si Kadar Teklif Ver</label>
          </div>
          <div className="modal_offer_input-single-container">
            <input
              type="radio"
              id="thirty"
              name="percentage-offer"
              value={thirtyPercent()}
              onChange={() => setOfferTogo(thirtyPercent)}
            />
            <label htmlFor="thirty">%30’u Kadar Teklif Ver</label>
          </div>
          <div className="modal_offer_input-single-container">
            <input
              type="radio"
              id="forty"
              name="percentage-offer"
              value={fortyPercent()}
              onChange={() => setOfferTogo(fortyPercent)}
            />
            <label htmlFor="forty">%40’ı Kadar Teklif Ver</label>
          </div>
          <div className="modal_offer_input-custom-container">
            <input
              type="text"
              id="custom"
              name="custom"
              value={customOffer}
              placeholder="Teklif Belirle"
              onChange={handleCustomInput}
            />
            <span>TL</span>
          </div>
        </div>
        <button
          className="modal_offer_submit-button"
          onClick={() => handleOffer(offerTogo)}
        >
          Onayla
        </button>
      </div>
    );
  };

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        {modalContent && modalContent === "buy" && <BuyModalContent />}
        {modalContent && modalContent === "offer" && <OfferModalContent />}
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default Modal;
