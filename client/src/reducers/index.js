import { combineReducers } from "redux";
import cart from "./cartReducer";
import api from "./apiReducer";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productReviewsReducer,
  productUpdateReducer,
} from "./productReducers";
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMyListReducer,
  orderPayReducer,
} from "./orderReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./userReducers";
export default combineReducers({
  userLogin: userLoginReducer,
  cart,
  api,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviews: productReviewsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productReviewCreate: productReviewCreateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});
