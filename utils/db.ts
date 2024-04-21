import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Connected to DB");
    if (mongoose.connections[0].readyState) {
      console.log("Already connected to DB");
      return;
    }
  } catch (err) {
    console.log(err);
  }
}
