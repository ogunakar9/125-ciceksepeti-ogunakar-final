import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  fetchBrands,
  fetchColors,
  fetchStatuses,
} from "../../store/actions";
import UploadImageInput from "../../components/ProductComponents/CreateProduct/UploadImageInput";
import Header from "../../components/Header/Header";
import { is_number } from "../../utilities/Constants";
import { useHistory } from "react-router-dom";

const CreateProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchColors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStatuses());
  }, [dispatch]);

  const { categories, newImageUrl } = useSelector((state) => state.products);

  const { colors, statuses, brands } = useSelector((state) => state.main);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    isOfferable: false,
    price: "",
  });
  const [titleWarning, setTitleWarning] = useState(false);
  const [descriptionWarning, setDescriptionWarning] = useState(false);
  const [numberWarning, setNumberWarning] = useState(false);

  const handleProductOfferable = () => {
    setNewProduct({ ...newProduct, isOfferable: !newProduct["isOfferable"] });
  };

  const handleTitleChange = (e) => {
    if (e.target.value.length > 100) {
      setTitleWarning(true);
    } else {
      setTitleWarning(false);
      setNewProduct({
        ...newProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length > 500) {
      setDescriptionWarning(true);
    } else {
      setDescriptionWarning(false);
      setNewProduct({
        ...newProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handlePriceChange = (e) => {
    if (!e.target.value?.match(is_number)) {
      setNumberWarning(true);
      setNewProduct({
        ...newProduct,
        [e.target.name]: e.target.value,
      });
    } else {
      setNumberWarning(false);
      setNewProduct({
        ...newProduct,
        [e.target.name]: parseInt(e.target.value),
      });
    }
  };

  const handleSelectChange = (e, valueType) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: valueType[e.target.value],
    });
  };
  //All the validations before creation.
  const handleCreateProduct = () => {
    if (
      newImageUrl !== "" &&
      !titleWarning &&
      !descriptionWarning &&
      !numberWarning &&
      newProduct.description.length > 0 &&
      newProduct.title.length > 0 &&
      newProduct.price > 0 &&
      newProduct.brand &&
      newProduct.color &&
      newProduct.category &&
      newProduct.status
    ) {
      dispatch(createProduct(newProduct, history));
    } else {
      window.alert("Lutfen tum degerleri gecerli doldurun.");
    }
  };

  return (
    <>
      <Header />
      <div className="create-product_wrapper">
        <div className="create-product_content-wrapper">
          <div className="create-product-detail_wrapper">
            <div className="create-product-detail_input-wrapper">
              <div className="create-product-detail_title">
                <span>??r??n Detaylar??</span>
              </div>
              <div className="create-product-detail_input-section">
                <label htmlFor="title">??r??n Ad??</label>
                <input
                  required
                  className={
                    titleWarning ? "create-product-detail_input-wrong" : ""
                  }
                  placeholder="??rnek: Iphone 12 Pro Max"
                  name="title"
                  type="text"
                  id="new-product-name"
                  value={newProduct.title}
                  onChange={handleTitleChange}
                />
                {titleWarning && (
                  <span className="create-product-detail_input_section-warning">
                    En fazla 100 karakter kullanabilirsiniz.
                  </span>
                )}
              </div>
              <div className="create-product-detail_input-section">
                <label htmlFor="description">A????klama</label>
                <textarea
                  required
                  className={
                    descriptionWarning
                      ? "create-product-detail_input-wrong"
                      : ""
                  }
                  placeholder="??r??n a????klamas?? girin"
                  name="description"
                  id="description"
                  value={newProduct.description}
                  onChange={handleDescriptionChange}
                />
                {descriptionWarning && (
                  <span className="create-product-detail_input_section-warning">
                    En fazla 500 karakter kullanabilirsiniz.
                  </span>
                )}
              </div>
              <div className="create-product-detail_double_input-section">
                <div className="create-product-detail_input-section">
                  <label htmlFor="category">Kategori</label>
                  <select
                    id="category"
                    name="category"
                    required
                    defaultValue={""}
                    onChange={(e) => handleSelectChange(e, categories)}
                  >
                    <option value="" disabled hidden>
                      Kategori se??
                    </option>
                    {categories.map((item, idx) => (
                      <option value={idx} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="create-product-detail_input-section">
                  <label htmlFor="brand">Marka</label>
                  <select
                    id="brand"
                    name="brand"
                    required
                    defaultValue={""}
                    onChange={(e) => handleSelectChange(e, brands)}
                  >
                    <option value="" disabled hidden>
                      Marka se??
                    </option>
                    {brands.map((item, idx) => (
                      <option value={idx} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="create-product-detail_double_input-section">
                <div className="create-product-detail_input-section">
                  <label htmlFor="color">Renk</label>
                  <select
                    id="color"
                    name="color"
                    defaultValue={""}
                    onChange={(e) => handleSelectChange(e, colors)}
                  >
                    <option value="" disabled hidden>
                      Renk se??
                    </option>
                    {colors.map((item, idx) => (
                      <option value={idx} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="create-product-detail_input-section">
                  <label htmlFor="status">Kullan??m durumu</label>
                  <select
                    id="status"
                    name="status"
                    defaultValue={""}
                    onChange={(e) => handleSelectChange(e, statuses)}
                  >
                    <option value="" disabled hidden>
                      Kullan??m durumu se??
                    </option>
                    {statuses.map((item, idx) => (
                      <option value={idx} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="create-product-detail_input-section-price">
                <div className="create-product-detail_input-section">
                  <label htmlFor="price">Fiyat</label>
                  <input
                    placeholder="Bir fiyat girin"
                    name="price"
                    type="text"
                    id="price"
                    value={newProduct.price}
                    onChange={handlePriceChange}
                    className={
                      numberWarning ? "create-product-detail_input-wrong" : ""
                    }
                  />
                  {numberWarning && (
                    <span className="create-product-detail_input_section-warning">
                      0-9 Aras??nda Bir Rakam Girin
                    </span>
                  )}
                </div>
                <div className="create-product-detail_input-section offer-fixer">
                  <label htmlFor="isOfferable">Teklif opsiyonu</label>
                  <input
                    name="isOfferable"
                    type="checkbox"
                    id="isOfferable"
                    value={newProduct.isOfferable}
                    onChange={handleProductOfferable}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="create-product-detail_upload-wrapper">
            <UploadImageInput />
          </div>
          <div>
            <button
              className="create_product-button"
              onClick={handleCreateProduct}
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
