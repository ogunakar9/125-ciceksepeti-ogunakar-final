import React from "react";
import "./styles.scss";
import CardContainer from "../Cards/CardContainer/CardContainer";
import CategoryContainer from "../Categories/CategoryContainer";
import Loader from "../../shared/Loader/Loader";
import bannerImage from "../../../assets/homepage/Banner1/Banner1@2x.png";
import bannerImageSm from "../../../assets/homepage/Banner1/Banner1.png";

const ProductsContainer = () => {
  return (
    <div className="products-wrapper">
      <Loader />
      <div className="banner-container">
        <img
          src={bannerImageSm}
          srcSet={`${bannerImageSm} 500w, ${bannerImage} 1000w`}
          alt="banner-img"
        />
      </div>
      <CategoryContainer />
      <CardContainer />
    </div>
  );
};

export default ProductsContainer;
