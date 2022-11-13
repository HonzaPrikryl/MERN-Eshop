import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createUser = await User.insertMany(users);
    const admin = createUser[0]._id;
    const adminProducts = products.map((product) => {
      return { ...product, user: admin };
    });
    await Product.insertMany(adminProducts);

    console.log("Data imported".green);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red);
    process.exit(1);
  }
};
const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data deleted");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};
if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
