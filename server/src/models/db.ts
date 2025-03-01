import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const DB = process.env.DB;
    if (!DB) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
        mongoose.connect(DB);
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
    }
}