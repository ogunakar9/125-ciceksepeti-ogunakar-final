import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
const CardContainer = () => {
  const items = useSelector((state) => state.products.items);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {items.map((item) => (
        <Card
          key={item.id}
          img={item.imageUrl}
          price={item.price}
          brand={item.brand.title}
          color={item.color.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default CardContainer;
