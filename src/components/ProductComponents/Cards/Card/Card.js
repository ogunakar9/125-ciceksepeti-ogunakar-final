import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

const Card = ({ img, price, brand, color, description, id }) => {
  return (
    <Link to={`/productdetails/${id}`} className="card_item-background">
      <div className="card_item-image-wrapper">
        <img className="card_item-image" src={img} alt={description} />
      </div>
      <div className="card_item_detail">
        <div className="card_item_minor-info">
          <div className="card_item-brand">
            <span>{brand}</span>
          </div>
          <div className="card_item_color">
            <span className="card_item_color-title">Renk: </span>
            <span className="card_item_color-value">{color}</span>
          </div>
        </div>
        <div className="card_item_price">
          <span>{price} TL</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
