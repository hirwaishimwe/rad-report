import Exam from "../models/examModel.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.info("MongoDB connected successfully");
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });

export const deleteAllPatients = async () => {
  try {
    await Exam.deleteMany({});
    console.log("All patients deleted successfully.");
  } catch (error) {
    console.error("Error deleting patients:", error);
  } finally {
    await mongoose.connection.close();
  }
};
