import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}`,
    );
    console.log("Mongodb connect....!!!");
  } catch (error) {
    console.log("Mongodb connection error...", error);
    throw error;
  }
};

export default connectDb;
