import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrders } from "./types";

const initialState: Partial<IOrders> = {};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    newOrderCreated: (state, action: PayloadAction<IOrders>) => {
      return action.payload as IOrders;
    },
  },
});

export const { newOrderCreated } = orderSlice.actions;

export default orderSlice.reducer;
