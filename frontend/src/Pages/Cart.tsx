// CartScreen.tsx

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CartItem } from "../redux/types";

const CartScreen: React.FC = () => {
  const cartItems: CartItem[] = useSelector(
    (state: RootState) => state.cartReducer.cartItems
  );

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item: CartItem) => (
            <li key={item.product._id}>
              Product ID: {item.product._id}, Quantity: {item.product.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartScreen;
