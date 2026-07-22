import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import Rating from "@components/ProductCard/Rating";
import QuantitySelector from "./QuantitySelector";
import { useGetProductDetailsQuery } from "@slices/productApiSlice";
import Loader from "@components/Loader";
import Alert from "@components/Alert";
import { useDispatch } from "react-redux";
import { addToCart } from "@slices/cartSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateProductReviewMutation,
  useGetProductReviewsQuery,
} from "@slices/productApiSlice";
import { toast } from "react-toastify";
import { IoStar, IoStarOutline } from "react-icons/io5";

const ProductDetailsScreen = () => {
  const { id: productId } = useParams();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery(productId);
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useGetProductReviewsQuery(productId);
  const [createProductReview, { isLoading: isSubmittingReview }] =
    useCreateProductReviewMutation();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    if (!rating) {
      toast.error("Please select a star rating");
      return;
    }

    try {
      await createProductReview({ productId, rating, comment }).unwrap();
      setRating(0);
      setComment("");
      toast.success("Thank you for your review");
    } catch (reviewError) {
      toast.error(
        reviewError?.data?.message ||
          reviewError?.error ||
          "Unable to submit your review",
      );
    }
  };

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
          <Loader />
        ) : isError ? (
          <Alert type="error">{error.data?.message || error?.error}</Alert>
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

              <section className="mt-12 max-w-2xl" aria-labelledby="reviews-heading">
                <h2
                  id="reviews-heading"
                  className="text-lg font-semibold text-slate-900"
                >
                  Customer reviews
                </h2>

                <div className="mt-5 space-y-5">
                  {reviewsLoading ? (
                    <Loader />
                  ) : reviewsError ? (
                    <Alert type="error">
                      {reviewsError?.data?.message || reviewsError?.error}
                    </Alert>
                  ) : reviews.length ? (
                    reviews.map((review) => (
                      <article
                        key={review._id}
                        className="border-b border-slate-200 pb-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <p className="font-medium text-slate-900">
                              {review.name}
                            </p>
                            <Rating value={review.rating} />
                          </div>
                          <time
                            className="text-sm text-slate-500"
                            dateTime={review.createdAt}
                          >
                            {new Date(review.createdAt).toLocaleDateString()}
                          </time>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {review.comment}
                        </p>
                      </article>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No reviews yet.</p>
                  )}
                </div>

                <div className="mt-10 border-t border-slate-200 pt-8">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Write a review
                  </h3>
                  {userInfo ? (
                    <form className="mt-5" onSubmit={handleReviewSubmit}>
                      <fieldset>
                        <legend className="text-sm font-medium text-slate-700">
                          Rating
                        </legend>
                        <div className="mt-2 flex gap-1" role="radiogroup">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              aria-label={`${star} star${star === 1 ? "" : "s"}`}
                              aria-pressed={rating === star}
                              onClick={() => setRating(star)}
                              className="cursor-pointer rounded p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              {star <= rating ? (
                                <IoStar className="h-6 w-6 text-amber-400" />
                              ) : (
                                <IoStarOutline className="h-6 w-6 text-slate-300" />
                              )}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                      <label
                        htmlFor="review-comment"
                        className="mt-5 block text-sm font-medium text-slate-700"
                      >
                        Comment
                      </label>
                      <textarea
                        id="review-comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        required
                        rows={4}
                        className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button
                        type="submit"
                        disabled={isSubmittingReview}
                        className="mt-5 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmittingReview ? "Submitting..." : "Submit review"}
                      </button>
                    </form>
                  ) : (
                    <p className="mt-3 text-sm text-slate-600">
                      Please <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">sign in</Link> to write a review.
                    </p>
                  )}
                </div>
              </section>
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
              <QuantitySelector
                quantity={qty}
                setQuantity={setQty}
                countInStock={product.countInStock}
              />
              {/* Add to Cart button*/}
              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className=" focus:outline focus:ring-2 mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white transition-all cursor-pointer hover:bg-indigo-700"
              >
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
