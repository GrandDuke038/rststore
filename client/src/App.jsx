import Layout from "@components/Layout";
import HomeScreen from "@screens/Home";
import ErrorScreen from "@screens/Error";
import ProductDetailsScreen from "@screens/ProductDetails";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "@screens/Cart";

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
      {
        path: "*",
        element: <ErrorScreen />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
