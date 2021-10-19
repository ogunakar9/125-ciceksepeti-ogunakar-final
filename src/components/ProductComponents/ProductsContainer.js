import React from "react";
import CardContainer from "./Cards/CardContainer";
import CategoryContainer from "./Categories/CategoryContainer";
import Loader from "../shared/Loader/Loader";

const ProductsContainer = () => {
  return (
    <div>
      <Loader />
      <CategoryContainer />
      <CardContainer />
    </div>
  );
};

export default ProductsContainer;
