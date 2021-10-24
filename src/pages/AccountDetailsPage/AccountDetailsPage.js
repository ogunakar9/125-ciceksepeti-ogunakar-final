import React, { useEffect, useState } from "react";
import "./styles.scss";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  acceptOffer,
  purchaseProduct,
  rejectOffer,
  setModal,
} from "../../store/actions";
import profileIconBig from "../../assets/account-details/profile-icons/profile-icon-big.png";
import Notification from "../../components/shared/Notification/Notification";
import successIcon from "../../assets/auth/successIcon/successIcon@2x.png";
import Modal from "../../components/shared/Modal/Modal";

const AccountDetailsPage = () => {
  const history = useHistory();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  //TODO: think about whether you want to redirect to main page when page refreshes
  useEffect(() => {
    if (!isSignedIn) {
      history.push("/signin");
    }
  }, [isSignedIn, history]);

  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
  const { givenOffers, receivedOffers } = useSelector((state) => state.account);

  const [activeTab, setActiveTab] = useState("received");
  console.log("given", givenOffers);
  console.log("received", receivedOffers);

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
  //TODO: item satin alindiktan sonra asagidaki listboxta gosterilmeli mi find out
  const handlePurchaseOffered = (id) => {
    console.log("purchase id", id);
    // dispatch(purchaseProduct(id));
    dispatch(setModal({ isModalOpen: true, modalContent: "buy" }));
  };
  //TODO: satildiysa nasil gostercen dikkat et
  const text = "Satın Alındı";
  //TODO: item satin aldiginda notification sonrasi satin alindi diye listede status belirtcen

  const ReceivedOfferSection = ({ item }) => {
    if (!item.product.isSold) {
      if (item?.status === "offered") {
        return (
          <div>
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
          <>
            <Modal productId={item?.product.id} />
            <button
              className="account-details_list_right_section_buy-button"
              onClick={() => handlePurchaseOffered(item?.product.id)}
            >
              Satın Al
            </button>
            <div
              className={`account-details_list_right_section_status offer_status-${item?.status}`}
            />
          </>
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
                    <ReceivedOfferSection item={item} />
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
                        {item?.product.title}
                      </div>
                      <div className="account-details_list-box_info-price">
                        <span>Alınan Teklif:</span>
                        <span>{item?.offeredPrice} TL</span>
                      </div>
                    </div>
                  </div>
                  <div className="account-details_list_right-section">
                    <GivenOfferSection item={item} />
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
