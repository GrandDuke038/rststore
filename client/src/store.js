import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

import { cartReducer } from "./reducers/cartReducer";
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMyListReducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productReviewsReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import {
  supportMyTicketsReducer,
  supportTicketAssignReducer,
  supportTicketCreateReducer,
  supportTicketDetailsReducer,
  supportTicketReplyReducer,
  supportTicketsListReducer,
  supportTicketStatusReducer,
} from "./reducers/supportReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer as updateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviews: productReviewsReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: updateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
  supportTicketCreate: supportTicketCreateReducer,
  supportMyTickets: supportMyTicketsReducer,
  supportTicketDetails: supportTicketDetailsReducer,
  supportTicketsList: supportTicketsListReducer,
  supportTicketReply: supportTicketReplyReducer,
  supportTicketStatus: supportTicketStatusReducer,
  supportTicketAssign: supportTicketAssignReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "paypal";

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
