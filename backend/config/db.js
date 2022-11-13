import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected: ${connect.connection.host}`.bgGreen.black.bold
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.bgRed.bold);
    process.exit(1);
  }
};

export default connectDB;
