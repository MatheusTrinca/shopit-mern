import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
} from '../constants/productsConstants';

const initialState = {
  products: [],
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        products: [],
        loading: true,
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        products: action.payload.products,
        loading: false,
        productsCount: action.payload.productsCount,
      };
    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
