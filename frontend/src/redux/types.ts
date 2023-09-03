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
  reviews: IReview[];
}

export interface IReview {
  name: string;
  rating: string;
  comment: string;
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
  postalCode: number | null;
  country: string;
}

export interface IPaymentResult {
  id?: string;
  status?: string;
  updateTime?: string;
  email?: string;
}
export interface IOrders {
  _id: string;
  user: string;
  orderItems: IOrderItem[];
  shipping: IShippingAddress;
  paymentMethod: string;
  paymentResult: IPaymentResult;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface INewOrder {
  orderItems: IOrderItem[];
  shipping: IShippingAddress;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export interface IOrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
}
