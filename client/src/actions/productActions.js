import axios from "axios";
import { requestFail, requestStart, requestSuccess } from "./apiActions";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEWS_FAIL,
  PRODUCT_REVIEWS_REQUEST,
  PRODUCT_REVIEWS_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";

const errorMessage = (error) => error.response?.data?.message || error.message;

export const listProducts =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get("/api/v1/products", { params });
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: errorMessage(error) });
      throw error;
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: errorMessage(error) });
    throw error;
  }
};

export const getProductReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REVIEWS_REQUEST });
    const { data } = await axios.get(`/api/v1/products/${id}/reviews`);
    dispatch({ type: PRODUCT_REVIEWS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: PRODUCT_REVIEWS_FAIL, payload: errorMessage(error) });
    throw error;
  }
};

export const createProductReview =
  ({ productId, rating, comment }) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
      const { data } = await axios.post(
        `/api/v1/products/${productId}/reviews`,
        { rating, comment },
      );
      dispatch({ type: PRODUCT_REVIEW_CREATE_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: PRODUCT_REVIEW_CREATE_FAIL,
        payload: errorMessage(error),
      });
      throw error;
    }
  };

export const createProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const { data } = await axios.post("/api/v1/products");
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: errorMessage(error) });
    throw error;
  }
};

export const updateProduct =
  ({ productId, ...product }) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
      const { data } = await axios.put(
        `/api/v1/products/${productId}`,
        product,
      );
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: PRODUCT_UPDATE_FAIL, payload: errorMessage(error) });
      throw error;
    }
  };

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    await axios.delete(`/api/v1/products/${id}`);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: errorMessage(error) });
    throw error;
  }
};

// Uploads remain in the shared API reducer because they are not product state.
export const uploadProductImage = (formData) => async (dispatch) => {
  dispatch(requestStart("uploadImage"));
  try {
    const { data } = await axios.post("/api/v1/uploads", formData);
    dispatch(requestSuccess("uploadImage", data));
    return data;
  } catch (error) {
    dispatch(requestFail("uploadImage", error));
    throw error.response?.data || error;
  }
};
