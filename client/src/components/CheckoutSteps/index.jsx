import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex items-center gap-2">
      {step1 ? (
        <Link to="/login" className="text-slate-900 hover:text-indigo-700">
          Sign In
        </Link>
      ) : (
        <span className="cursor-not-allowed opacity-50">Sign In</span>
      )}

      <ChevronRightIcon className="h-5 w-5 text-gray-400" />

      {step2 ? (
        <Link to="/shipping" className="text-slate-900 hover:text-indigo-700">
          Shipping
        </Link>
      ) : (
        <span className="cursor-not-allowed opacity-50">Shipping</span>
      )}

      <ChevronRightIcon className="h-5 w-5 text-gray-400" />

      {step3 ? (
        <Link to="/payment" className="text-slate-900 hover:text-indigo-700">
          Payment
        </Link>
      ) : (
        <span className="cursor-not-allowed opacity-50">Payment</span>
      )}

      <ChevronRightIcon className="h-5 w-5 text-gray-400" />

      {step4 ? (
        <Link
          to="/place-order"
          className="text-slate-900 hover:text-indigo-700"
        >
          Place Order
        </Link>
      ) : (
        <span className="cursor-not-allowed opacity-50">Place Order</span>
      )}
    </nav>
  );
};

export default CheckoutSteps;
