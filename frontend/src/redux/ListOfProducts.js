import { createSlice } from "@reduxjs/toolkit";

export const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: {
    products: [],
  },
  reducers: {
    addProducts: (state, action) => {
      state.products.push(action.payload)
    },
  },
});

export default allProductsSlice.reducer;
