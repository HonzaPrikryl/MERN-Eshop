import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import { IStore } from "./types";

const store = configureStore<IStore>({
  reducer: {
    productsReducer,
    productReducer,
    cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
