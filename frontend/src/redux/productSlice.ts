import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct, IProductFetch } from "./types";

export const fetchProduct = createAsyncThunk(
  "fetchProduct",
  async (id: string | undefined) => {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  }
);

const initialState: IProductFetch = {
  product: {
    _id: null,
    name: "",
    image: "",
    description: "",
    brand: "",
    category: "",
    price: null,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProduct.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.status = "succeeded";
          state.product = action.payload;
        }
      )
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        // @ts-ignore
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
