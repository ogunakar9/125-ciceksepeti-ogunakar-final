import React, { useState } from "react";
import "./styles.scss";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { acceptOffer, rejectOffer, setModal } from "../../store/actions";
import profileIconBig from "../../assets/account-details/profile-icons/profile-icon-big.png";
import Notification from "../../components/shared/Notification/Notification";
import successIcon from "../../assets/auth/successIcon/successIcon@2x.png";
import Modal from "../../components/shared/Modal/Modal";

const AccountDetailsPage = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
  const { givenOffers, receivedOffers } = useSelector((state) => state.account);

  const [activeTab, setActiveTab] = useState("received");

  const handleReceived = () => {
    setActiveTab("received");
  };

  const handleGiven = () => {
    setActiveTab("given");
  };

  const handleAcceptOffer = (id) => {
    dispatch(acceptOffer(id));
  };

  const handleRejectOffer = (id) => {
    dispatch(rejectOffer(id));
  };
  const handlePurchaseOffered = () => {
    dispatch(setModal({ isModalOpen: true, modalContent: "buy" }));
  };
  const text = "Satın Alındı";

  const ReceivedOfferSection = ({ item }) => {
    if (!item.product.isSold) {
      if (item?.status === "offered") {
        return (
          <div className="details_list_right_section_status_btn-fixer">
            <button
              className="account-details_list_right_section_buy-button"
              onClick={() => handleAcceptOffer(item?.id)}
            >
              Onayla
            </button>
            <button
              className="account-details_list_right_section_reject-button"
              onClick={() => handleRejectOffer(item?.id)}
            >
              Reddet
            </button>
          </div>
        );
      } else {
        return (
          <div
            className={`account-details_list_right_section_status offer_status-${item?.status}`}
          />
        );
      }
    } else {
      return (
        <div className="account-details_list_right_section_status offer_isSold" />
      );
    }
  };

  const GivenOfferSection = ({ item }) => {
    if (item.product.isSold) {
      return (
        <div className="account-details_list_right_section_status offer_isSold" />
      );
    } else {
      if (item?.status === "accepted") {
        return (
          <div className="details_list_right_section_status_btn-fixer">
            <Modal productId={item?.product.id} />
            <button
              className="account-details_list_right_section_accept-button"
              onClick={() => handlePurchaseOffered(item?.product.id)}
            >
              Satın Al
            </button>
            <div
              className={`account-details_list_right_section_status offer_status-${item?.status}`}
            />
          </div>
        );
      } else if (item?.status === "rejected") {
        return (
          <div
            className={`account-details_list_right_section_status offer_status-${item?.status}`}
          />
        );
      } else if (item?.status === "offered") {
        return (
          <div className="account-details_list_right_section_status offer_status-waiting">
            Beklemede
          </div>
        );
      }
    }
  };

  return (
    <>
      <Header />
      <Notification text={text} icon={successIcon} type={"success"} />
      <div className="account-details_container">
        <div className="account-details_mail-wrapper">
          <img src={profileIconBig} alt="profile-icon" />
          <span>{email}</span>
        </div>
        <div className="account-details_list-container">
          <div className="account-details_list_button-container">
            <button
              onClick={handleReceived}
              className={`account-details_list-button ${
                activeTab === "received" &&
                "account-details_list_selected-button"
              }`}
            >
              <p>Teklif Aldıklarım</p>
            </button>
            <button
              onClick={handleGiven}
              className={`account-details_list-button ${
                activeTab === "given" && "account-details_list_selected-button"
              }`}
            >
              <p>Teklif Verdiklerim</p>
            </button>
          </div>
          <div className="account-details_list-box_wrapper">
            {activeTab === "received" &&
              receivedOffers.map((item) => (
                <div key={item?.id} className="account-details_list-box_card">
                  <div className="account-details_list_left-section">
                    <div>
                      <img
                        className="account-details_list-box_image"
                        src={item?.product.imageUrl}
                        alt={item?.product.title}
                      />
                    </div>
                    <div className="account-details_list-box_info-container">
                      <div className="account-details_list-box_info-title">
                        <span>{item?.product.title}</span>
                      </div>
                      <div className="account-details_list-box_info-price">
                        <span>Alınan Teklif:</span>
                        <span>{item?.offeredPrice} TL</span>
                      </div>
                    </div>
                  </div>
                  <div className="account-details_list_right-section">
                    <div className="account-details_list_right-section_mobile-fixer">
                      <ReceivedOfferSection item={item} />
                    </div>
                  </div>
                </div>
              ))}

            {activeTab === "given" &&
              givenOffers.map((item) => (
                <div key={item?.id} className="account-details_list-box_card">
                  <div className="account-details_list_left-section">
                    <div>
                      <img
                        className="account-details_list-box_image"
                        src={item?.product.imageUrl}
                        alt={item?.product.title}
                      />
                    </div>
                    <div className="account-details_list-box_info-container">
                      <div className="account-details_list-box_info-title">
                        <span>{item?.product.title}</span>
                      </div>
                      <div className="account-details_list-box_info-price">
                        <span>Alınan Teklif:</span>
                        <span>{item?.offeredPrice} TL</span>
                      </div>
                    </div>
                  </div>
                  <div className="account-details_list_right-section">
                    <div className="account-details_list_right-section_mobile-fixer">
                      <GivenOfferSection item={item} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetailsPage;
