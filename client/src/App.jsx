import Layout from "@components/Layout";
import HomeScreen from "@screens/Home";
import ErrorScreen from "@screens/Error";
import ProductDetailsScreen from "@screens/ProductDetails";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";

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
      {
        path: "*",
        element: <ErrorScreen />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

// const App = () => {
//   return (
//     <div className="flex min-h-screen flex-col bg-slate-200">
//       <Header />

//       <div className="h-14 sm:h-18 lg:h-28" />
//       <div className="grow">
//         <HomeScreen />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default App;
