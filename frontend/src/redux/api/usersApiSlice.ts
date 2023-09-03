import {
  INewOrder,
  IOrders,
  IProfileInfoChange,
  IUserInfo,
  IUserInfoLogin,
  IUserInfoRegister,
} from "../types";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IUserInfo, IUserInfoLogin>({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<IUserInfo, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation<IUserInfo, IUserInfoRegister>({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    updateUser: builder.mutation<IUserInfo, IProfileInfoChange>({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
    }),
    createNewOrder: builder.mutation<IOrders, INewOrder>({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useCreateNewOrderMutation,
} = usersApiSlice;
