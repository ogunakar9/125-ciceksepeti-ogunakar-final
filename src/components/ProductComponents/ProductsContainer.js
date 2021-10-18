import React from "react";
import CardContainer from "./Cards/CardContainer";
import CategoryContainer from "./Categories/CategoryContainer";
import Modal from "../Modal/Modal";

const ProductsContainer = () => {
  return (
    <div>
      <Modal />
      <CategoryContainer />
      <CardContainer />
    </div>
  );
};

export default ProductsContainer;
