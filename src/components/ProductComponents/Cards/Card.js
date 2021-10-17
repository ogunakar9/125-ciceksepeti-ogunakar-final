import React from "react";
import { Link } from "react-router-dom";

const Card = ({ img, price, brand, color, description, id, title }) => {
  return (
    <div style={{ maxWidth: "250px", height: "100%", position: "relative" }}>
      <Link to={`/productdetails/${id}`}>
        <img
          style={{ width: "100%", objectFit: "contain" }}
          src={img}
          alt={description}
        />
      </Link>
      <span>{price}</span>
      <span>{brand}</span>
      <span>{color}</span>
      <span>{title}</span>
    </div>
  );
};

export default Card;
