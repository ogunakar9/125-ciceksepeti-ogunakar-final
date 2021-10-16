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
    productDetails: { isOfferable, offerId },
  } = useSelector((state) => state.products);
  return (
    <div>
      <p>{id}</p>
      {isOfferable &&
        (offerId ? (
          <button onClick={cancel}>Teklifi Geri Cek</button>
        ) : (
          <button onClick={give}>Teklif Ver</button>
        ))}
    </div>
  );
};

export default ProductDetails;
