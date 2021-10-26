import React, { useState } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { GrClose } from "react-icons/gr";
import { giveOffer, purchaseProduct, setModal } from "../../../store/actions";

const Modal = ({ productDetails, productId }) => {
  const dispatch = useDispatch();
  const { isModalOpen, modalContent } = useSelector((state) => state.main);

  if (!isModalOpen) {
    return null;
  }

  const handleModalClose = () => {
    dispatch(
      setModal({
        isModalOpen: false,
        modalContent: null,
      })
    );
  };

  const BuyModalContent = ({ productId }) => {
    console.log(productId);
    const handleBuy = () => {
      dispatch(purchaseProduct(productId));
    };

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
    const handleOffer = (customerOffer) => {
      dispatch(giveOffer(productId, customerOffer));
    };

    const { imageUrl, title, price, id: productId } = productDetails;

    const [customOffer, setCustomOffer] = useState("");
    const [offerTogo, setOfferTogo] = useState(null);
    const [checked, setCheckBoxChecked] = useState(false);

    const twentyPercent = (price * 20) / 100;
    const thirtyPercent = (price * 30) / 100;
    const fortyPercent = (price * 40) / 100;

    const handleCustomInput = (e) => {
      //TODO: handle input checks here
      setCheckBoxChecked(false);
      setCustomOffer(e.target.value);
      setOfferTogo(parseInt(e.target.value));
    };

    const inputs = [
      { label: "%20’si Kadar Teklif Ver", value: twentyPercent },
      { label: "%30’u Kadar Teklif Ver", value: thirtyPercent },
      { label: "%40’ı Kadar Teklif Ver", value: fortyPercent },
    ];

    const handleRadioInput = (value) => {
      setCheckBoxChecked(value);
      setOfferTogo(value);
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
          {inputs.map((input) => (
            <div
              className={`modal_offer_input-single-container ${
                input["value"] === checked &&
                "modal_offer_input-single-container_selected"
              }`}
              key={input["value"]}
            >
              <input
                type="radio"
                id={input["value"]}
                checked={input["value"] === checked}
                onChange={() => handleRadioInput(input["value"])}
                value={input["value"]}
                name="percentage-offer"
              />
              <label htmlFor={input["value"]}>{input["label"]}</label>
            </div>
          ))}
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
        {modalContent && modalContent === "buy" && (
          <BuyModalContent productId={productId} />
        )}
        {modalContent && modalContent === "offer" && <OfferModalContent />}
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default Modal;
