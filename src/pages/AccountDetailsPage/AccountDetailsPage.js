import React, { useEffect, useState } from "react";
import "./styles.scss";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { acceptOffer, purchaseProduct, rejectOffer } from "../../store/actions";
import profileIconBig from "../../assets/account-details/profile-icons/profile-icon-big.png";

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
  const { givenOffers } = useSelector((state) => state.account);
  const { receivedOffers } = useSelector((state) => state.account);

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
    dispatch(purchaseProduct(id));
  };
  return (
    <>
      <Header />
      <div className="account-details_container">
        <div className="account-details_mail-wrapper">
          <img src={profileIconBig} alt="profile-icon" />
          <span>{email}</span>
        </div>
        <div className="account-details_list-container">
          <div className="account-details_list_button-container">
            <button
              onClick={handleReceived}
              className={
                activeTab === "received" &&
                "account-details_list_selected-button"
              }
            >
              <p>Teklif Verdiklerim</p>
            </button>
            <button
              onClick={handleGiven}
              className={
                activeTab === "given" && "account-details_list_selected-button"
              }
            >
              <p>Teklif Aldıklarım</p>
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
                      <div>
                        <span>{item?.product.title}</span>
                      </div>
                      <div className="account-details_list-box_info-price">
                        <span>Alınan Teklif:</span>
                        <span>{item?.offeredPrice} TL</span>
                      </div>
                    </div>
                  </div>
                  <div className="account-details_list_right-section">
                    {!item.product.isSold && (
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
                    )}
                    {/*TODO: find out how things get listed as accepted or denied*/}
                    <div className="account-details_list_right_section_status">
                      <span>{item?.status}</span>
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
                        {item?.product.title}
                      </div>
                      <div className="account-details_list-box_info-price">
                        <span>Alınan Teklif:</span>
                        <span>{item?.offeredPrice} TL</span>
                      </div>
                    </div>
                  </div>
                  <div className="account-details_list_right-section">
                    {!item?.product.isSold && (
                      <button
                        className="account-details_list_right_section_buy-button"
                        onClick={() => handlePurchaseOffered(item?.product.id)}
                      >
                        Satın Al
                      </button>
                    )}
                    <div className="account-details_list_right_section_status">
                      <span>{item?.status}</span>
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
