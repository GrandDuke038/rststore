import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Layout from "@components/Layout";
import HomeScreen from "@screens/Home";
import ErrorScreen from "@screens/Error";
import ProductDetailsScreen from "@screens/ProductDetails";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "@screens/Cart";
import LoginScreen from "@screens/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShippingScreen from "@screens/Shipping";
import PrivateRoute from "@components/PrivateRoute";
import PaymentScreen from "@screens/Payment";
import PlaceOrderScreen from "@screens/PlaceOrder";
import OrderScreen from "@screens/Order";
import ProfileScreen from "@screens/Profile";
import OrderListScreen from "@screens/OrderList";
import AdminRoute from "@components/AdminRoute";

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
      { path: "/product/:id", element: <ProductDetailsScreen /> },
      { path: "/cart", element: <CartScreen /> },
      { path: "/login", element: <LoginScreen /> },
      {
        path: "",
        element: <PrivateRoute />,
        children: [{ path: "/shipping", element: <ShippingScreen /> }],
      },
      { path: "/payment", element: <PaymentScreen /> },
      { path: "/place-order", element: <PlaceOrderScreen /> },
      { path: "/order/:id", element: <OrderScreen /> },
      { path: "/profile", element: <ProfileScreen /> },
      {
        path: "",
        element: <AdminRoute />,
        children: [{ path: "admin/order-list", element: <OrderListScreen /> }],
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
      <PayPalScriptProvider deferLoading={true} options={{ currency: "USD" }}>
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
        />
      </PayPalScriptProvider>
    </Provider>
  );
};

export default App;
