import axios from "axios";

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

export const listProducts =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get("/api/v1/products", { params });
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const getProductReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REVIEWS_REQUEST });
    const { data } = await axios.get(`/api/v1/products/${id}/reviews`);
    dispatch({ type: PRODUCT_REVIEWS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: PRODUCT_REVIEWS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const createProductReview =
  ({ productId, rating, comment }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/v1/products/${productId}/reviews`,
        { rating, comment },
        config,
      );
      dispatch({ type: PRODUCT_REVIEW_CREATE_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: PRODUCT_REVIEW_CREATE_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/products", {}, config);
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const updateProduct =
  ({ productId, ...product }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/products/${productId}`,
        product,
        config,
      );
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: PRODUCT_UPDATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
  };

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    await axios.delete(`/api/v1/products/${id}`, config);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
    return true;
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const uploadProductImage = (formData) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await axios.post("/api/v1/uploads", formData, config);
    return data;
  } catch {
    return undefined;
  }
};
