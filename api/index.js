import { dirname, join } from "path";
import express, { static as expressStatic, json, urlencoded } from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleWare/errorMiddleWare.js";
import { fileURLToPath } from "url";
import indexRouter from "./routes/index.js";
import logger from "morgan";
import mongoose from "mongoose";
import usersRouter from "./routes/users.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const URL = process.env.FRONTEND_URL;

// Middlewares
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: false }));

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(expressStatic(join(__dirname, "public")));

app.use(
  cors({
    origin: [URL, PORT],
    credentials: true,
  })
);

// Routes Middleware
app.use(logger("dev"));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressStatic(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

// Error Middleware
app.use(errorHandler);

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
}

app.listen(PORT, () => {
  connect();
  console.log(`Server up on port ${PORT}`);
});
