import {
  SG_FETCH_GIVEN_OFFERS,
  SG_CANCEL_OFFER,
  SG_FETCH_RECEIVED_OFFERS,
  SG_REJECT_OFFER,
  SG_ACCEPT_OFFER,
} from "../types/AccountTypes";

export const fetchGivenOffers = () => ({
  type: SG_FETCH_GIVEN_OFFERS,
});

export const fetchReceivedOffers = () => ({
  type: SG_FETCH_RECEIVED_OFFERS,
});

export const rejectOffer = (id) => ({
  type: SG_REJECT_OFFER,
  payload: id,
});

export const acceptOffer = (id) => ({
  type: SG_ACCEPT_OFFER,
  payload: id,
});

export const cancelOffer = (productId, offerId) => ({
  type: SG_CANCEL_OFFER,
  payload: {
    productId,
    offerId,
  },
});
