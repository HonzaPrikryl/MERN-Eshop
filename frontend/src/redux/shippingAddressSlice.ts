import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShippingAddress } from "./types";
import { SHIPPING_ADDRESS_STORAGE_KEY } from "../constants/localStorageKeys";

const saveShippingAddressToLocalStorage = (
  shippingAddressInfo: IShippingAddress
) => {
  localStorage.setItem(
    SHIPPING_ADDRESS_STORAGE_KEY,
    JSON.stringify(shippingAddressInfo)
  );
};

const getShippingAddressFromLocalStorage = (): IShippingAddress | null => {
  const shippingAddressJSON = localStorage.getItem(
    SHIPPING_ADDRESS_STORAGE_KEY
  );
  if (shippingAddressJSON) {
    return JSON.parse(shippingAddressJSON);
  }
  return null;
};

const initialState: IShippingAddress = getShippingAddressFromLocalStorage() || {
  address: "",
  city: "",
  postalCode: null,
  country: "",
};

const shippingAddressSlice = createSlice({
  name: "shippingAddress",
  initialState,
  reducers: {
    setShippingAddress: (state, action: PayloadAction<IShippingAddress>) => {
      state.address = action.payload.address;
      state.city = action.payload.city;
      state.postalCode = action.payload.postalCode;
      state.country = action.payload.country;
      saveShippingAddressToLocalStorage(state);
    },
  },
});

export const { setShippingAddress } = shippingAddressSlice.actions;
export default shippingAddressSlice.reducer;
