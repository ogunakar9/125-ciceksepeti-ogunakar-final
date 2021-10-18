import React, { useEffect, useState } from "react";
import RealHeader from "../components/RealHeader";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const AccountDetailsPage = () => {
  const history = useHistory();
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
          <p>Received offers</p>
        </div>
        <div
          onClick={handleGiven}
          style={{
            marginLeft: 50,
            borderBottom: activeTab === "given" && "2px solid black",
          }}
        >
          <p>Given offers</p>
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
                    <button>Onayla</button>
                    <button>Reddet</button>
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
                {!item.product.isSold && (
                  <div>
                    <button>Onayla</button>
                    <button>Reddet</button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AccountDetailsPage;
