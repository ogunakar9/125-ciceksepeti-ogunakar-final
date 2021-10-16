import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cancelOffer, fetchProductsDetail, giveOffer } from "../store/actions";

const ProductDetails = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductsDetail(id));
  }, []);

  const give = () => {
    dispatch(giveOffer(id));
  };

  const cancel = () => {
    dispatch(cancelOffer(id, offerId));
  };

  const {
    productDetails: { isOfferable, offerId, isSold },
  } = useSelector((state) => state.products);

  const OfferButtons = ({ offerId }) => {
    return offerId ? (
      <button onClick={cancel}>Teklifi Geri Cek</button>
    ) : (
      <button onClick={give}>Teklif Ver</button>
    );
  };
  return (
    <div>
      <p>{id}</p>
      {isSold && <button disabled>Urun Satilmis</button>}
      {!isSold && isOfferable && <OfferButtons offerId={offerId} />}
    </div>
  );
};

export default ProductDetails;
