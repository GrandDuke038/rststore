import Layout from "@components/Layout";
import HomeScreen from "@screens/HomeScreen";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
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
