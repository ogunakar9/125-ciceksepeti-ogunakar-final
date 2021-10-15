import React from "react";

const Card = ({ img, price, brand, color, description }) => {
  return (
    <div style={{ maxWidth: "250px", height: "100%", position: "relative" }}>
      <img
        style={{ width: "100%", objectFit: "contain" }}
        src={img}
        alt={description}
      />
      <span>{price}</span>
      <span>{brand}</span>
      <span>{color}</span>
    </div>
  );
};

export default Card;
