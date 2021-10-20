import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductsDetail } from "../store/actions";
import Header from "../components/Header/Header";
import ProductDetailSection from "../components/ProductDetailComponents/ProductDetailSection/ProductDetailSection";
import Loader from "../components/shared/Loader/Loader";

const ProductDetails = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductsDetail(id));
  }, [dispatch, id]);

  return (
    <>
      <Header />
      <Loader />
      <ProductDetailSection id={id} />
    </>
  );
};

export default ProductDetails;
