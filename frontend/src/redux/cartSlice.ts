// cartSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "./types";

const CART_STORAGE_KEY = "cartItems";

// Function to save cart items to localStorage
const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
};

const getCartFromLocalStorage = (): CartItem[] => {
  const cartItemsJSON = localStorage.getItem(CART_STORAGE_KEY);
  if (cartItemsJSON) {
    return JSON.parse(cartItemsJSON);
  }
  return [];
};

const initialState: CartState = {
  cartItems: getCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const itemToAdd = action.payload;
      const existingItem = state.cartItems.findIndex(
        (item) => item.product._id === itemToAdd.product._id
      );

      if (existingItem !== -1) {
        // If the product already exists in the cart, update the quantity
        state.cartItems[existingItem].product.quantity +=
          itemToAdd.product.quantity;
      } else {
        // If the product doesn't exist in the cart, add it
        state.cartItems.push(itemToAdd);
      }
      saveCartToLocalStorage(state.cartItems);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
