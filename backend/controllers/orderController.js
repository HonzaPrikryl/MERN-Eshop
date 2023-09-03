import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

// @desc create new order
// @route POST /api/orders
// @access Private
const postNewOrder = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const {
    orderItems,
    shipping,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      user,
      orderItems,
      shipping,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

export { postNewOrder };
