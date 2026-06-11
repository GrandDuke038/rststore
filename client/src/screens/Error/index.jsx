import { Link } from "react-router-dom";

import Header from "@components/Header";
import Footer from "@components/Footer";

const ErrorScreen = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="grid grow place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-slate-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorScreen;
