import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import Rating from "@components/ProductCard/Rating";
import QuantitySelector from "./QuantitySelector";
import { useGetProductDetailsQuery } from "@slices/productApiSlice";

const ProductDetailsScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery(productId);

  return (
    <div className="bg-white pb-18 pt-6 sm:pb-24">
      <div className="sm:px6 mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-all hover:text-slate-700"
        >
          <ArrowUturnLeftIcon className="h-3.5 w-3.5" /> Back
        </Link>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>{error.data?.message || error?.error}</p>
        ) : (
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            {/* Image */}

            <div className="mt-8 lg:col-span-7 lg:mt-0">
              <h2 className="sr-only">Image</h2>
              <img
                src={product.image}
                alt={product.name}
                className="rounded-lg"
              />
            </div>
            {/* product name and other details */}
            <div className="lg:col-span-5">
              <h6 className="inline-block rounded-full border border-slate-300 px-3 py-0.5 text-xs font-medium text-slate-500">
                {product.category}
              </h6>
              <h6 className="mt-8 text-sm font-semibold text-indigo-700">
                {product.brand}
              </h6>
              <div className="mt-1 flex justify-between">
                <h1 className=" mt-1 text-2xl font-medium text-slate-900">
                  {product.name}
                </h1>
                <p className=" text-2xl font-medium text-slate-900">
                  ${product.price}
                </p>
              </div>
              {/* Rating */}
              <div className="my-1 flex items-center gap-0">
                <Rating value={product.rating} />
                <span className="ml-8 mt-0.5 text-sm font-semibold text-slate-700">
                  {product.numReviews} reviews
                </span>
              </div>
              {/* Description */}
              <div className="mt-10">
                <div className="mt-4 prose prose-slate prose-sm text-slate-500">
                  {product.description}
                </div>
              </div>
              {/* Quantity selector */}
              <QuantitySelector countInStock={product.countInStock} />
              {/* Add to Cart button*/}
              <button className=" focus:outline focus:ring-2 mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white transition-all cursor-pointer hover:bg-indigo-700">
                Add to cart
              </button>
              <div className="mt-10 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-slate-500">
                  Description
                </h2>
                <div className="prose prose-slate prose-sm  mt-4 text-slate-500">
                  <ReactMarkdown>{product?.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsScreen;
