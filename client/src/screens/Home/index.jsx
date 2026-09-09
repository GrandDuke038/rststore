import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import { listProducts } from "@actions/productActions";
import Alert from "@components/Alert";
import Loader from "@components/Loader";
import Paginate from "@components/Paginate";
import ProductCard from "@components/ProductCard";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products = [], pages, page, nextCursor, loading: isLoading, error } = productList;
  const isError = Boolean(error);
  const cursor = searchParams.get("cursor") || undefined;

  useEffect(() => {
    dispatch(listProducts({ pageNumber, keyword, cursor }));
  }, [dispatch, pageNumber, keyword, cursor]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-3 py-10 sm:px-6 lg:px-8">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Alert type="error">{error}</Alert>
        ) : (
          <>
            <div className="flex items-center gap-2">
              {keyword && (
                <button onClick={() => navigate("/")} type="button">
                  <span className="sr-only">Go back</span>
                  <ArrowLeftIcon className="mr-1 h-5 w-5 text-slate-900" />
                </button>
              )}
              <h1 className="text-2xl font-bold text-slate-900">
                {keyword ? `Search Results for ${keyword}` : "Latest Products"}
              </h1>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
        <Paginate
          pages={pages}
          page={page}
          nextCursor={nextCursor}
          keyword={keyword}
        />
      </div>
    </section>
  );
};

export default HomeScreen;
