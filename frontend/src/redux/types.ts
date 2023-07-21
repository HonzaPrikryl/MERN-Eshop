export interface IProductsFetch {
  products: IProduct[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface IProductFetch {
  product: IProduct;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface IProduct {
  _id: number | null;
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

export interface IStore {
  productsReducer: IProductsFetch;
  productReducer: IProductFetch;
}