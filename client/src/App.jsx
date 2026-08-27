import { lazy, Suspense } from "react";
import Layout from "@components/Layout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "@components/PrivateRoute";
import AdminRoute from "@components/AdminRoute";
import Loader from "@components/Loader";

const HomeScreen = lazy(() => import("@screens/Home"));
const ErrorScreen = lazy(() => import("@screens/Error"));
const ProductDetailsScreen = lazy(() => import("@screens/ProductDetails"));
const CartScreen = lazy(() => import("@screens/Cart"));
const LoginScreen = lazy(() => import("@screens/Login"));
const ShippingScreen = lazy(() => import("@screens/Shipping"));
const PaymentScreen = lazy(() => import("@screens/Payment"));
const PlaceOrderScreen = lazy(() => import("@screens/PlaceOrder"));
const OrderScreen = lazy(() => import("@screens/Order"));
const ProfileScreen = lazy(() => import("@screens/Profile"));
const OrderListScreen = lazy(() => import("@screens/OrderList"));
const ProductListScreen = lazy(() => import("@screens/ProductList"));
const ProductEditScreen = lazy(() => import("@screens/ProductEdit"));
const UserListScreen = lazy(() => import("@screens/UserList"));
const UserEditScreen = lazy(() => import("@screens/UserEdit"));
const RegisterScreen = lazy(() => import("@screens/Register"));
const SupportScreen = lazy(() => import("@screens/Support"));
const SupportTicketScreen = lazy(() => import("@screens/SupportTicket"));
const AdminSupportScreen = lazy(() => import("@screens/AdminSupport"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorScreen />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      { path: "/categories", element: <HomeScreen /> },
      {
        path: "/page/:pageNumber",
        element: <HomeScreen />,
      },
      {
        path: "/search/:keyword",
        element: <HomeScreen />,
      },
      {
        path: "/search/:keyword/page/:pageNumber",
        element: <HomeScreen />,
      },
      { path: "/product/:id", element: <ProductDetailsScreen /> },
      { path: "/cart", element: <CartScreen /> },
      { path: "/register", element: <RegisterScreen /> },
      { path: "/login", element: <LoginScreen /> },
      {
        path: "",
        element: <PrivateRoute />,
        children: [
          { path: "/shipping", element: <ShippingScreen /> },
          { path: "/payment", element: <PaymentScreen /> },
          { path: "/place-order", element: <PlaceOrderScreen /> },
          { path: "/order/:id", element: <OrderScreen /> },
          { path: "/profile", element: <ProfileScreen /> },
          { path: "/support", element: <SupportScreen /> },
          { path: "/support/:id", element: <SupportTicketScreen /> },
        ],
      },
      {
        path: "",
        element: <AdminRoute />,
        children: [
          { path: "admin/order-list", element: <OrderListScreen /> },
          { path: "admin/product-list", element: <ProductListScreen /> },
          { path: "admin/product/:id/edit", element: <ProductEditScreen /> },
          { path: "admin/user-list", element: <UserListScreen /> },
          { path: "admin/user/:id/edit", element: <UserEditScreen /> },
          { path: "admin/support", element: <AdminSupportScreen /> },
          { path: "admin/support/:id", element: <SupportTicketScreen /> },
        ],
      },

      {
        path: "*",
        element: <ErrorScreen />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
      />
    </Provider>
  );
};

export default App;
