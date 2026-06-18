import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id,
      );
      if (existingItem) {
        state.cartItem = state.cartItem.map((cartItem) => {
          return cartItem._id === existingItem._id ? item : cartItem;
        });
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      //calculate items prices
      state.itemsPrice = state.cartItems.reduce(
        (acc, currVal) => acc + currVal.price * currVal.qty,
      );
      //calculate shipping price
      state.shippingPrice = state.itemPrice > 5000 ? 0 : 2000;

      //calculate tax price
      state.taxPrice = 0.18 * state.itemsPrice;

      //calculate total price
      state.totalPrice =
        state.itemsPrice + state.shippingPrice + state.taxPrice;

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
