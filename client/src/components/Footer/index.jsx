import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto px-3 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-center text-sm text-slate-700 sm:text-left">
          &copy; {new Date().getFullYear()} RST Store. All rights Reserved.
        </p>
        <nav aria-label="Legal" className="flex items-center gap-4 text-sm">
          <Link
            to="/terms-of-service"
            className="text-slate-700 underline-offset-4 hover:text-indigo-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Terms of Service
          </Link>
          <Link
            to="/privacy-policy"
            className="text-slate-700 underline-offset-4 hover:text-indigo-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
