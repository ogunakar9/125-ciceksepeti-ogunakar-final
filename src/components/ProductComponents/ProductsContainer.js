import React from "react";
import CardContainer from "./Cards/CardContainer";
import CategoryContainer from "./Categories/CategoryContainer";

const ProductsContainer = () => {
  return (
    <div>
      <CategoryContainer />
      <CardContainer />
    </div>
  );
};

export default ProductsContainer;
