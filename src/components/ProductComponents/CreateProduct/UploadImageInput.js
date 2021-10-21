import React, { useRef } from "react";
import "./styles.scss";
import { removeImage, uploadNewProductImage } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import uploadIcon from "../../../assets/upload-products/Group 6911/Group 6911@2x.png";
import { IoMdCloseCircle } from "react-icons/io";

const UploadImageInput = () => {
  const dispatch = useDispatch();
  const fileInputField = useRef(null);
  const uploadedImage = useSelector((state) => state.products.newImageUrl);

  const handleImageChange = (e) => {
    dispatch(uploadNewProductImage(e.target.files[0]));
  };

  const handleRemoveImage = () => {
    dispatch(removeImage());
  };
  return (
    <>
      <div className="product_image_title">
        <span>Ürün Görseli</span>
      </div>
      {!uploadedImage && (
        <div>
          <div className="input-wrapper">
            <div className="input_info-overlay">
              <div className="input_info-image">
                <img src={uploadIcon} alt="upload-icon" />
              </div>
              <div className="input_info-overlay-drag">
                <span>Sürükleyip bırakarak yükle veya</span>
              </div>
              <div>
                <button
                  className="input_info-overlay-choose"
                  onClick={() => {
                    document.getElementById("new-image").click();
                  }}
                >
                  Görsel Seçin
                </button>
              </div>
              <div className="input_info-overlay-max">
                <span>PNG ve JPEG Dosya boyutu: max. 100kb</span>
              </div>
            </div>
            <input
              ref={fileInputField}
              type="file"
              id="new-image"
              name="new-image"
              title=""
              onChange={handleImageChange}
            />
          </div>
        </div>
      )}
      {uploadedImage && (
        <div className="uploaded_image_container">
          <img src={uploadedImage} alt="uploadedImage" />
          <IoMdCloseCircle
            className="delete_btn_uploaded_image"
            onClick={handleRemoveImage}
          />
        </div>
      )}
    </>
  );
};

export default UploadImageInput;
