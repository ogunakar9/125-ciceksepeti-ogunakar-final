import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsDetail } from "../store/actions";
import Header from "../components/Header/Header";
import ProductDetailSection from "../components/ProductDetailComponents/ProductDetailSection/ProductDetailSection";
import Loader from "../components/shared/Loader/Loader";
import Modal from "../components/shared/Modal/Modal";
import successIcon from "../assets/auth/successIcon/successIcon@2x.png";
import Notification from "../components/shared/Notification/Notification";
import { text } from "../utilities/Constants";

const ProductDetails = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductsDetail(id));
  }, [dispatch, id]);

  const { productDetails } = useSelector((state) => state.products);
  const { givenOffers } = useSelector((state) => state.account);
  const { offerId } = productDetails;
  const offer = givenOffers?.filter((item) => item.id === offerId)[0];

  return (
    <>
      <Header />
      <Loader />
      <Modal productDetails={productDetails} productId={id} />
      <Notification text={text} icon={successIcon} type={"success"} />
      <ProductDetailSection productDetails={productDetails} offer={offer} />
    </>
  );
};

export default ProductDetails;
