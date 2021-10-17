import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../store/actions";
import UploadImageInput from "../components/ProductComponents/CreateProduct/UploadImageInput";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);

  const { colors, statuses, brands } = useSelector((state) => state.main);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    isOfferable: false,
    price: 0,
  });
  //TODO: change input selector to custom css and enable it through click event

  const handleProductDetailChange = (e) => {
    if (e.target.name === "price") {
      setNewProduct({
        ...newProduct,
        [e.target.name]: parseInt(e.target.value),
      });
      return;
    }
    if (e.target.name === "isOfferable") {
      setNewProduct({
        ...newProduct,
        [e.target.name]: e.target.value === "true",
      });
      return;
    }
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectChange = (e, valueType) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: valueType[e.target.value],
    });
  };
  console.log(newProduct);
  const handleCreateProduct = () => {
    dispatch(createProduct(newProduct));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div>
        <h2>Urun Detaylari</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <label htmlFor="title">Urun adi</label>
          <input
            name="title"
            type="text"
            id="new-product-name"
            value={newProduct.title}
            onChange={handleProductDetailChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <label htmlFor="description">Aciklama</label>
          <input
            name="description"
            type="text"
            id="description"
            value={newProduct.description}
            onChange={handleProductDetailChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <label htmlFor="category">Kategori</label>
          <select
            id="category"
            name="category"
            onChange={(e) => handleSelectChange(e, categories)}
          >
            {categories.map((item, idx) => (
              <option value={idx} key={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <label htmlFor="brand">Brand</label>
          <select
            id="brand"
            name="brand"
            onChange={(e) => handleSelectChange(e, brands)}
          >
            {brands.map((item, idx) => (
              <option value={idx} key={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <label htmlFor="color">Colors</label>
          <select
            id="color"
            name="color"
            onChange={(e) => handleSelectChange(e, colors)}
          >
            {colors.map((item, idx) => (
              <option value={idx} key={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <label htmlFor="status">Kullanim durumu</label>
          <select
            id="status"
            name="status"
            onChange={(e) => handleSelectChange(e, statuses)}
          >
            {statuses.map((item, idx) => (
              <option value={idx} key={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <label htmlFor="price">Price</label>
          <input
            name="price"
            type="number"
            id="price"
            value={newProduct.price}
            onChange={handleProductDetailChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <label htmlFor="isOfferable">isOfferable</label>
          <input
            name="isOfferable"
            type="checkbox"
            id="isOfferable"
            value={newProduct.isOfferable}
            onChange={handleProductDetailChange}
          />
        </div>
      </div>
      <UploadImageInput />
      <div style={{ position: "absolute", bottom: 200 }}>
        <button onClick={handleCreateProduct}>create product</button>
      </div>
    </div>
  );
};

export default CreateProduct;
