import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CategoryContainer = () => {
  const categories = useSelector((state) => state.products.categories);

  return (
    <div className="category-container">
      <Link className="category-link" to="/">
        Hepsi
      </Link>
      {categories.map((item) => (
        <Link
          className="category-link"
          key={item.id}
          to={`/?category=${item.title}`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default CategoryContainer;
