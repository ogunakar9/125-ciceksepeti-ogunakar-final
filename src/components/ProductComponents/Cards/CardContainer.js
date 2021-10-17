import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const CardContainer = () => {
  const items = useSelector((state) => state.products.items);
  let query = new URLSearchParams(useLocation().search);
  const categoryQuery = query.get("category");
  let filtered = items;

  if (categoryQuery) {
    filtered = items.filter((item) => item.category.id === categoryQuery);
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {filtered.map((item) => (
        <Card
          key={item.id}
          img={item.imageUrl}
          price={item.price}
          brand={item.brand.title}
          color={item.color.title}
          description={item.description}
          title={item.title}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default CardContainer;
