import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    console.log("Connecting to the database...");
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
