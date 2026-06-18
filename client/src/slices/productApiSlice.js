import { PRODUCTS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery } = productApiSlice;
