import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

const errorMessage = (error) => error.response?.data?.message || error.message;

// Authentication is handled by the server's httpOnly session cookie, so these
// thunks do not add an Authorization header from Redux state.
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const { data } = await axios.post("/api/v1/orders", order);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: errorMessage(error) });
    throw error;
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/orders/${id}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: errorMessage(error) });
    throw error;
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });
    const { data } = await axios.put(
      `/api/v1/orders/${orderId}/pay`,
      paymentResult,
    );
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: errorMessage(error) });
    throw error;
  }
};

export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_MY_LIST_REQUEST });
    const { data } = await axios.get("/api/v1/orders/mine");
    dispatch({ type: ORDER_MY_LIST_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: ORDER_MY_LIST_FAIL, payload: errorMessage(error) });
    throw error;
  }
};

export const listOrders =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });
      const { data } = await axios.get("/api/v1/orders", {
        params: { pageNumber: page },
      });
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: ORDER_LIST_FAIL, payload: errorMessage(error) });
      throw error;
    }
  };

export const deliverOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });
    const { data } = await axios.put(`/api/v1/orders/${orderId}/deliver`, {});
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: ORDER_DELIVER_FAIL, payload: errorMessage(error) });
    throw error;
  }
};

export const getPayPalClientId = async () => {
  const { data } = await axios.get("/api/v1/config/paypal");
  return data;
};
