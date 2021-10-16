import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchReceivedOffers } from "../store/actions";

const AccountDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReceivedOffers());
  }, []);

  return (
    <div>
      <h1>this is account details</h1>
    </div>
  );
};

export default AccountDetails;
