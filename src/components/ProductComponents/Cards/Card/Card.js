import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

const Card = ({ img, price, brand, color, description, id, title }) => {
  return (
    <div className="card_item-background">
      <div className="card_item-inner">
        <div className="card_item-inner-wrapper">
          <Link className="card_item-link" to={`/productdetails/${id}`}>
            <div className="card_item-image-wrapper">
              <img className="card_item-image" src={img} alt={description} />
            </div>
          </Link>
        </div>
      </div>
      <div className="card_item-detail">
        <span>{price}</span>
        <span>{brand}</span>
        <span>{color}</span>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default Card;
