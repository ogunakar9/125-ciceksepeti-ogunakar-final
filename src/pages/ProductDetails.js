import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsDetail } from "../store/actions";
import Header from "../components/Header/Header";
import ProductDetailSection from "../components/ProductDetailComponents/ProductDetailSection/ProductDetailSection";
import Loader from "../components/shared/Loader/Loader";
import Modal from "../components/shared/Modal/Modal";

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
      <Modal productDetails={productDetails} />
      <ProductDetailSection productDetails={productDetails} offer={offer} />
    </>
  );
};

export default ProductDetails;
