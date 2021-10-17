import React, { useRef, useState } from "react";
import { uploadNewProductImage } from "../../../store/actions";
import { useDispatch } from "react-redux";

const UploadImageInput = () => {
  const dispatch = useDispatch();
  const fileInputField = useRef(null);
  const [image, setImage] = useState(null);

  const handleUpload = () => {
    dispatch(uploadNewProductImage(image));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div>
      <h2>Urun Gorseli</h2>
      <label htmlFor="new-image">Select a file:</label>
      <input
        ref={fileInputField}
        type="file"
        id="new-image"
        name="new-image"
        title=""
        onChange={handleImageChange}
      />
      <br />
      <button onClick={handleUpload}>upload</button>
    </div>
  );
};

export default UploadImageInput;
