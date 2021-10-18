import React, { useEffect, useState } from "react";
import RealHeader from "../components/RealHeader";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { acceptOffer, purchaseProduct, rejectOffer } from "../store/actions";

const AccountDetailsPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  useEffect(() => {
    if (!isSignedIn) {
      history.push("/signin");
    }
  }, [isSignedIn]);

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
    <div>
      <RealHeader />
      <div style={{ width: "100%", height: "20%", backgroundColor: "#ddd" }}>
        {email}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div
          onClick={handleReceived}
          style={{
            borderBottom: activeTab === "received" && "2px solid black",
          }}
        >
          <p>Teklif Verdiklerim givenoffers</p>
        </div>
        <div
          onClick={handleGiven}
          style={{
            marginLeft: 50,
            borderBottom: activeTab === "given" && "2px solid black",
          }}
        >
          <p>Teklif aldiklarim received offers</p>
        </div>
      </div>
      <div>
        {activeTab === "received" &&
          receivedOffers.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
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
            <div
              key={item.id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
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
  );
};

export default AccountDetailsPage;
