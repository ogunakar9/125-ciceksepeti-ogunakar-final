import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../store/actions";
import UploadImageInput from "../components/ProductComponents/CreateProduct/UploadImageInput";

const CreateProduct = () => {
  const dispatch = useDispatch();

  const [newProductDetails, setNewProductDetails] = useState({});
  //TODO: change input selector to custom css and enable it through click event

  const handleProductDetailChange = (e) => {
    setNewProductDetails({
      ...newProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProduct = () => {
    dispatch(createProduct(newProductDetails));
  };

  const { newImageUrl } = useSelector((state) => state.products);
  console.log(newImageUrl);
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
            value={newProductDetails.name}
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
