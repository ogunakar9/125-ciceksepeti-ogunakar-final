import React, { useState } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store/actions";
import UploadImageInput from "../../components/ProductComponents/CreateProduct/UploadImageInput";
import Header from "../../components/Header/Header";

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
    <>
      <Header />
      <div className="create-product_wrapper">
        <div className="create-product_content-wrapper">
          <div className="create-product-detail_wrapper">
            <div className="create-product-detail_input-wrapper">
              <div className="create-product-detail_title">
                <span>Ürün Detayları</span>
              </div>
              <div className="create-product-detail_input-section">
                <label htmlFor="title">Ürün Adı</label>
                <input
                  placeholder="Örnek: Iphone 12 Pro Max"
                  name="title"
                  type="text"
                  id="new-product-name"
                  value={newProduct.title}
                  onChange={handleProductDetailChange}
                />
              </div>
              <div className="create-product-detail_input-section">
                <label htmlFor="description">Açıklama</label>
                <textarea
                  placeholder="Ürün açıklaması girin"
                  name="description"
                  id="description"
                  value={newProduct.description}
                  onChange={handleProductDetailChange}
                />
              </div>
              <div className="create-product-detail_double_input-section">
                <div className="create-product-detail_input-section">
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
                <div className="create-product-detail_input-section">
                  <label htmlFor="brand">Marka</label>
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
              </div>
              <div className="create-product-detail_double_input-section">
                <div className="create-product-detail_input-section">
                  <label htmlFor="color">Renk</label>
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
                <div className="create-product-detail_input-section">
                  <label htmlFor="status">Kullanım durumu</label>
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
              </div>
              {/*TODO: Change css if input is wrong! Add indicators for user*/}
              <div className="create-product-detail_input-section-price">
                <div className="create-product-detail_input-section">
                  <label htmlFor="price">Fiyat</label>
                  <input
                    placeholder="Bir fiyat girin TL"
                    name="price"
                    type="number"
                    id="price"
                    value={newProduct.price}
                    onChange={handleProductDetailChange}
                  />
                </div>
                <div className="create-product-detail_input-section offer-fixer">
                  <label htmlFor="isOfferable">Teklif opsiyonu</label>
                  <input
                    name="isOfferable"
                    type="checkbox"
                    id="isOfferable"
                    value={newProduct.isOfferable}
                    onChange={handleProductDetailChange}
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
