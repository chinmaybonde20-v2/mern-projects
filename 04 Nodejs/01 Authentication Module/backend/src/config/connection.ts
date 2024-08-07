import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const uri: string = process.env.MONGO_URI || "";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Connection Failed", error);
    process.exit(1);
  }
};
