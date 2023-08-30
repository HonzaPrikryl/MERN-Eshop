import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import shippingAddressReducer from "./shippingAddressSlice";
import paymentMethodReducer from "./paymentMethodSlice";

const store = configureStore({
  reducer: {
    cartReducer,
    authReducer,
    shippingAddressReducer,
    paymentMethodReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
