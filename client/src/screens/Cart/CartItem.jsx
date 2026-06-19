import { Link } from "react-router-dom";
import ItemQuantityDropdown from "./ItemQuantityDropdown";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";

const CartItem = ({ product, index, handleAddToCart }) => {
  return (
    <li className="flex py-6 sm:py-10">
      <div className="shrink-0">
        <img
          src={product.image}
          alt={product.alt}
          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <Link
                  to={`/product/${product._id}`}
                  className="text-base font-semibold text-slate-700 hover:text-slate-800"
                >
                  {product.name}
                </Link>
              </h3>
              <div className="absolute right-0 top-0">
                <button className="  cursor-pointer m-2 inline-flex p-2 text-green-500 hover:text-slate-500">
                  <span className="sr-only">Remove</span>
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-slate-500">{product.brand}</p>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-900">
            $ {product.price}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:pr-9 relative">
          <ItemQuantityDropdown
            product={product}
            index={index}
            handleAddToCart={handleAddToCart}
          />
        </div>

        <p className="mt-4 flex space-x-2 text-sm text-slate-700">
          {product.countInStock > 0 ? (
            <CheckIcon className="h-5 w-5 text-green-500" />
          ) : (
            <ClockIcon className="h-5 w-5 text-slate-300" />
          )}

          <span>{product.countInStock > 0 ? "In Stock" : "Not Available"}</span>
        </p>
      </div>
    </li>
  );
};

export default CartItem;
