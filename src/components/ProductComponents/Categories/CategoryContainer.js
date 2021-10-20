import React from "react";
import "./styles.scss";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const CategoryContainer = () => {
  const categories = useSelector((state) => state.products.categories);

  let query = new URLSearchParams(useLocation().search);
  const categoryQuery = query.get("category");

  return (
    <nav className="category-container" aria-labelledby="category-container">
      <Link
        className={
          categoryQuery ? "category-link" : "category-link category-selected"
        }
        to="/"
      >
        Hepsi
      </Link>
      {categories.map((item) => (
        <Link
          className={
            categoryQuery === item.title
              ? "category-link category-selected"
              : "category-link"
          }
          key={item.id}
          to={`/?category=${item.title}`}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default CategoryContainer;
