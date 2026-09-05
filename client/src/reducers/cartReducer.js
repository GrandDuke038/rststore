import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";
import { updateCart } from "../utils/cartUtils";

const initialState = updateCart({
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  paymentMethod: localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : "paypal",
});
export default function cartReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case CART_ADD_ITEM: {
      const exists = state.cartItems.find(
        (item) => item._id === action.payload._id,
      );
      nextState = {
        ...state,
        cartItems: exists
          ? state.cartItems.map((item) =>
              item._id === exists._id ? action.payload : item,
            )
          : [...state.cartItems, action.payload],
      };
      return updateCart(nextState);
    }
    case CART_REMOVE_ITEM:
      return updateCart({
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload,
        ),
      });
    case CART_SAVE_SHIPPING_ADDRESS:
      return updateCart({ ...state, shippingAddress: action.payload });
    case CART_SAVE_PAYMENT_METHOD:
      return updateCart({ ...state, paymentMethod: action.payload });
    case CART_CLEAR_ITEMS:
      return updateCart({ ...state, cartItems: [] });
    default:
      return state;
  }
}
