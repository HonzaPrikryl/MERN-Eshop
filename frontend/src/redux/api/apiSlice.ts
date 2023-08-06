import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../types";

type Products = IProduct[];

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProducts: builder.query<Products, void>({
      query: () => "/products",
    }),
    getSingleProduct: builder.query<IProduct, string>({
      query: (id) => `/products/${id}`,
    }),
    login: builder.mutation({
      query: (initialPost) => ({
        url: "/users/login",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Profile"],
    }),
    register: builder.mutation({
      query: (initialPost) => ({
        url: "/users/register",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Profile"],
    }),
    getUserProfile: builder.query<any, void>({
      query: () => "/users/profile",
      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useLoginMutation,
} = apiSlice;
