import React, { useRef, useState } from "react";
import "./styles.scss";
import { removeImage, uploadNewProductImage } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import uploadIcon from "../../../assets/upload-products/Group 6911/Group 6911@2x.png";
import { IoMdCloseCircle } from "react-icons/io";
import Loader from "react-loader-spinner";

const UploadImageInput = () => {
  const dispatch = useDispatch();
  const fileInputField = useRef(null);
  const uploadedImage = useSelector((state) => state.products.newImageUrl);
  const { loading } = useSelector((state) => state.main);
  const [warningMsgVisible, setWarningMsgVisible] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]?.size / 1024 > 400) {
      setWarningMsgVisible(true);
    } else if (
      e.target.files[0]?.type !== "image/png" ||
      e.target.files[0]?.type !== "image/jpg" ||
      e.target.files[0]?.type !== "image/jpeg"
    ) {
      setWarningMsgVisible(true);
    } else {
      setWarningMsgVisible(false);
      dispatch(uploadNewProductImage(e.target.files[0]));
    }
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
            {!loading && (
              <>
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
                  <div
                    className={`input_info-overlay-max ${
                      warningMsgVisible && "input_info-overlay-warning"
                    }`}
                  >
                    <span>PNG ve JPEG Dosya boyutu: max. 400kb</span>
                  </div>
                </div>
                <input
                  ref={fileInputField}
                  type="file"
                  id="new-image"
                  name="new-image"
                  title=""
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleImageChange}
                />
              </>
            )}
            <Loader
              className="loader"
              type="Oval"
              color="black"
              height={100}
              width={100}
              visible={loading}
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
