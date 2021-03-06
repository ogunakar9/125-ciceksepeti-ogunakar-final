import React from "react";
import "./styles.scss";
import { cancelOffer, setModal } from "../../../store/actions";
import { useDispatch } from "react-redux";

const ProductDetailSection = ({ productDetails, offer }) => {
  const dispatch = useDispatch();

  const handleBuy = () => {
    dispatch(setModal({ isModalOpen: true, modalContent: "buy" }));
  };

  const handleGive = () => {
    dispatch(setModal({ isModalOpen: true, modalContent: "offer" }));
  };

  const handleCancel = () => {
    dispatch(cancelOffer(id, offerId));
  };
  const {
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
    id,
  } = productDetails;

  const OfferButtons = ({ offerId }) => {
    //offerId = true ==>> offer exists
    return offerId ? (
      <button className="product_offer_button" onClick={handleCancel}>
        Teklifi Geri Cek
      </button>
    ) : (
      <button className="product_offer_button" onClick={handleGive}>
        Teklif Ver
      </button>
    );
  };

  const ProductsDetailStaticInfo = ({ staticInfo }) => {
    return (
      <div className="products_detail_text-info-static">
        <span>{staticInfo}</span>
      </div>
    );
  };

  const ProductsDetailStaticInfoWrapper = () => {
    return (
      <div className="products_detail_text-info-container-item">
        <ProductsDetailStaticInfo staticInfo={"marka:"} />
        <ProductsDetailStaticInfo staticInfo={"renk:"} />
        <ProductsDetailStaticInfo staticInfo={"kullanım durumu:"} />
      </div>
    );
  };

  const PriceInfoWrapper = ({ className }) => {
    return (
      <div className={className}>
        <div className="products_detail_text-price">
          <span>{price} TL</span>
        </div>
        {offer && !isSold && (
          <div className="products_detail_text_offered-price">
            <span>Verilen Teklif:</span>
            <span>{offer.offeredPrice} TL</span>
          </div>
        )}
      </div>
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
          <PriceInfoWrapper className={`products_price_small`} />
          <div className="products_detail_text-info-container">
            <ProductsDetailStaticInfoWrapper />
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
          <PriceInfoWrapper className={`products_price_big`} />
          <div className="product_button_container">
            {isSold && (
              <button className="product_sold_button" disabled>
                bu ürün satışta değil
              </button>
            )}
            {!isSold && isOfferable && (
              <div>
                <button onClick={handleBuy} className="product_buy_button">
                  Satın Al
                </button>
                <OfferButtons offerId={offerId} />
              </div>
            )}
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
    </div>
  );
};

export default ProductDetailSection;
