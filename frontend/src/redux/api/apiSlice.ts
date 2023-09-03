import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOrders, IProduct } from "../types";

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
    getUserProfile: builder.query<any, void>({
      query: () => "/users/profile",
      providesTags: ["Profile"],
    }),
    getOrders: builder.query<IOrders, void>({
      query: () => "/orders",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useGetUserProfileQuery,
  useGetOrdersQuery,
} = apiSlice;
