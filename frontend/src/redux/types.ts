export interface IProductsFetch {
  products: IProduct[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface IProduct {
  _id: string | null;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number | null;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export interface CartItem {
  product: IProduct & { quantity: number };
}

export interface CartState {
  cartItems: CartItem[];
}

export interface IStore {
  productsReducer: IProductsFetch;
  cartReducer: CartState;
}
