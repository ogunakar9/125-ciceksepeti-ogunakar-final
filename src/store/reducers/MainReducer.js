import {
  SET_BRAND,
  SET_BRANDS,
  SET_COLOR,
  SET_COLORS,
  SET_LOADING,
  SET_MODAL,
  SET_NOTIFICATION,
  SET_STATUS,
  SET_STATUSES,
} from "../types/MainTypes";

const INIT_STATE = {
  loading: false,
  isModalOpen: false,
  notificationOpen: false,
  modalContent: null,
  colors: [],
  brands: [],
  statuses: [],
  color: null,
  brand: null,
  status: null,
};

export default function mainReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case SET_MODAL:
      return {
        ...state,
        isModalOpen: action.payload.isModalOpen,
        modalContent: action.payload.modalContent,
      };
    case SET_NOTIFICATION:
      return {
        ...state,
        notificationOpen: action.payload,
      };
    case SET_COLORS:
      return {
        ...state,
        colors: action.payload,
      };
    case SET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };
    case SET_STATUSES:
      return {
        ...state,
        statuses: action.payload,
      };
    case SET_COLOR:
      return {
        ...state,
        color: action.payload,
      };
    case SET_BRAND:
      return {
        ...state,
        brand: action.payload,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
}
