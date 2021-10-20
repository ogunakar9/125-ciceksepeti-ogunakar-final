import React from "react";
import "./styles.scss";
import { cancelOffer, giveOffer } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailSection = ({ id }) => {
  const dispatch = useDispatch();

  const give = () => {
    dispatch(giveOffer(id));
  };

  const cancel = () => {
    dispatch(cancelOffer(id, offerId));
  };

  const {
    productDetails: {
      isOfferable,
      offerId,
      isSold,
      imageUrl,
      title,
      brand,
      color,
      status,
      price,
      description,
      // offeredPrice,
    },
  } = useSelector((state) => state.products);
  // console.log("offeredPrice", offeredPrice);
  const OfferButtons = ({ offerId }) => {
    //offerId = true ==>> offer exists
    return offerId ? (
      <button onClick={cancel}>Teklifi Geri Cek</button>
    ) : (
      <button onClick={give}>Teklif Ver</button>
    );
  };

  return (
    <div className="products_detail_wrapper">
      <div className="products_detail_main-container">
        <div className="products_detail_image-container">
          <img src={imageUrl} alt={title} />
        </div>
        <div className="products_detail_text-container">
          <div className="products_detail_text-title">
            <span className="products_detail_text-title">{title}</span>
          </div>
          <div className="products_detail_text-info-container">
            <div className="products_detail_text-info-container-item">
              <div className="products_detail_text-info-static">
                <span>marka:</span>
              </div>
              <div className="products_detail_text-info-static">
                <span>renk:</span>
              </div>
              <div className="products_detail_text-info-static">
                <span>kullanım durumu:</span>
              </div>
            </div>
            <div className="products_detail_text-info-container-item">
              <div className="products_detail_text-info-dynamic">
                <span>{brand?.title}</span>
              </div>
              <div className="products_detail_text-info-dynamic">
                <span>{color?.title}</span>
              </div>
              <div className="products_detail_text-info-dynamic">
                <span className="products_detail_text-info-dynamic">
                  {status?.title}
                </span>
              </div>
            </div>
          </div>
          <div className="products_detail_text-price">
            <span>{price} TL</span>
          </div>
          {/*TODO: display offeredPrice here*/}
          {/*{offerId ? <span>*/}
          {/*  {}*/}
          {/*</span>}*/}
          <div>
            {isSold && (
              <button className="product_sold_button" disabled>
                bu ürün satışta değil
              </button>
            )}
            {!isSold && isOfferable && <OfferButtons offerId={offerId} />}
          </div>
          <div>
            <div className="products_detail_text-info_description-title">
              <span>açıklama</span>
            </div>
            <div className="products_detail_text-info_description">
              <span>{description}</span>
            </div>
          </div>
        </div>
      </div>

      {/*<p>{id}</p>*/}
    </div>
  );
};

export default ProductDetailSection;
