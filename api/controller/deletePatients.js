import Exam from "../models/examModel.js";
import chalk from "chalk";
import dotenv from "dotenv";
import mongoose from "mongoose";
/* eslint-disable no-undef */
/*eslint no-undef: "error"*/
/*eslint-env node*/

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
        console.info(chalk.greenBright("MongoDB connected "));
    })
    .catch((error) => {
        console.error(chalk.redBright("Error connecting to MongoDB:", error));
    });

export const deleteAllPatients = async () => {
    try {
        await Exam.deleteMany({});
        console.log(chalk.redBright("All patients deleted successfully."));
    } catch (error) {
        console.error(chalk.bgRedBright("Error deleting patients:", error));
    } finally {
        await mongoose.connection.close();
    }
};
