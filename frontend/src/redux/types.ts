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

export interface IUserInfo {
  email: string;
  isAdmin: boolean;
  name: string;
  _id: string;
}

export interface IUserInfoLogin {
  email: string;
  password: string;
}

export interface IUserInfoRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IProfileInfoChange {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
}

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
