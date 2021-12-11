import axios from 'axios';
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
} from '../constants/productsConstants';

// Get All Products
export const getProducts = () => async dispatch => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    const { data } = await axios.get('/api/v1/products');

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
