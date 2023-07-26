import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct, IProductsFetch } from "./types";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("/api/products");
    return response.data;
  }
);

const saveProductsToLocalStorage = (products: IProduct[]) => {
  localStorage.setItem("products", JSON.stringify(products));
};

export const loadProductsFromLocalStorage = () => {
  const productsJson = localStorage.getItem("products");
  if (productsJson) {
    return JSON.parse(productsJson);
  }
  return [];
};

const initialState: IProductsFetch = {
  products: loadProductsFromLocalStorage(),
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.status = "succeeded";
          state.products = action.payload;
          saveProductsToLocalStorage(action.payload);
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        // @ts-ignore
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
