import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadNewProductImage } from "../store/actions";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const fileInputField = useRef(null);
  const [image, setImage] = useState({});
  //TODO: change input selector to custom css and enable it through click event

  const handleUpload = () => {
    dispatch(uploadNewProductImage(image));
  };

  const handleChange = (e) => {
    setImage({ [e.target.name]: e.target.files[0] });
  };

  return (
    <div>
      <h1>this is add product</h1>
      <label htmlFor="newImage">Select a file:</label>
      <input
        ref={fileInputField}
        type="file"
        id="newImage"
        name="newImage"
        title=""
        // value={image}
        onChange={handleChange}
      />
      <button onClick={handleUpload}>upload</button>
    </div>
  );
};

export default CreateProduct;
