import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { apiSlice } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
