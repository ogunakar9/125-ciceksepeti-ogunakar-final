import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CategoryContainer = () => {
  const categories = useSelector((state) => state.products.categories);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        maxWidth: "100%",
        height: "150px",
      }}
    >
      <Link to="/">Hepsi</Link>
      {categories.map((item) => (
        <Link key={item.id} to={`/?category=${item.id}`}>
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default CategoryContainer;
