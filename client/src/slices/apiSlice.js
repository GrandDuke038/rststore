import { createApi, fetchBasequery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "constants";

const baseQuery = fetchBasequery({ baseurl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"],
  endpoints: () => ({}),
});
