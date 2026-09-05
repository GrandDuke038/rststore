import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import { ORDER_MY_LIST_RESET } from "../constants/orderConstants";
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

const errorMessage = (error) => error.response?.data?.message || error.message;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post("/api/v1/users/login", {
      email,
      password,
    });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: errorMessage(error) });
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("/api/v1/users/logout");
  } finally {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: CART_CLEAR_ITEMS });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: USER_UPDATE_PROFILE_RESET });
    dispatch({ type: USER_UPDATE_RESET });
    dispatch({ type: ORDER_MY_LIST_RESET });
    dispatch({ type: USER_LIST_RESET });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await axios.post("/api/v1/users", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: errorMessage(error) });
    throw error;
  }
};

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get("/api/v1/users/profile");
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: errorMessage(error) });
    throw error;
  }
};

export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const { data } = await axios.put("/api/v1/users/profile", user);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: errorMessage(error) });
    throw error;
  }
};

export const listUsers =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_LIST_REQUEST });
      const { data } = await axios.get("/api/v1/users", {
        params: { pageNumber: page },
      });
      dispatch({ type: USER_LIST_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: USER_LIST_FAIL, payload: errorMessage(error) });
      throw error;
    }
  };

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    await axios.delete(`/api/v1/users/${id}`);
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_DELETE_FAIL, payload: errorMessage(error) });
    throw error;
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/users/${id}`);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: errorMessage(error) });
    throw error;
  }
};

export const updateUser =
  ({ userId, ...user }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
      const { data } = await axios.put(`/api/v1/users/${userId}`, user);
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: USER_UPDATE_FAIL, payload: errorMessage(error) });
      throw error;
    }
  };
