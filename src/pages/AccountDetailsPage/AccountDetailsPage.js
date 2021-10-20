import React, { useState } from "react";
import "./styles.scss";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { acceptOffer, purchaseProduct, rejectOffer } from "../../store/actions";
import profileIconBig from "../../assets/account-details/profile-icons/profile-icon-big.png";

const AccountDetailsPage = () => {
  // const history = useHistory();
  // const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  //TODO: think about whether you want to redirect to main page when page refreshes
  // useEffect(() => {
  //   if (!isSignedIn) {
  //     history.push("/signin");
  //   }
  // }, [isSignedIn, history]);

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
                <div key={item.id} className="account-details_list-box_card">
                  <div>
                    <img
                      src={item.product.imageUrl}
                      style={{ height: 100, width: 100 }}
                      alt={item.product.title}
                    />
                    <p>{item.product.price}</p>
                  </div>
                  <div>
                    {!item.product.isSold && (
                      <div>
                        <button onClick={() => handleAcceptOffer(item.id)}>
                          Onayla
                        </button>
                        <button onClick={() => handleRejectOffer(item.id)}>
                          Reddet
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

            {activeTab === "given" &&
              givenOffers.map((item) => (
                <div key={item.id} className="account-details_list-box_card">
                  <div>
                    <img
                      src={item.product.imageUrl}
                      style={{ height: 100, width: 100 }}
                      alt={item.product.title}
                    />
                    <p>{item.product.price}</p>
                  </div>
                  <div>
                    <div>
                      {/*{!item.product.isSold && (*/}
                      <button
                        onClick={() => handlePurchaseOffered(item.product.id)}
                      >
                        Satin al
                      </button>
                      {/*)}*/}
                      <span>{item.status}</span>
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
