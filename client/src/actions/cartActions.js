import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      _id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      brand: data.brand,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (address) => async (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: address });

  localStorage.setItem("shippingAddress", JSON.stringify(address));
};

export const savePaymentMethod = (method) => async (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: method });

  localStorage.setItem("paymentMethod", JSON.stringify(method));
};

export const clearCartItems = () => (dispatch, getState) => {
  dispatch({ type: CART_CLEAR_ITEMS });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
