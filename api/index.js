import { dirname, join } from "path";
import express, { static as expressStatic } from "express";
import { format, transports } from "winston";

import { MongoDB } from "winston-mongodb";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleWare/errorMiddleWare.js";
import expressWinston from "express-winston";
import { fileURLToPath } from "url";
import indexRouter from "./routes/index.js";
import mongoose from "mongoose";
import passport from "passport";
import rateLimit from "express-rate-limit";
import session from "express-session";
import usersRouter from "./routes/users.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const URL = process.env.FRONTEND_URL;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
});

/* logger*/
app.use(
  expressWinston.logger({
    transports: [
      new transports.Console(),
      new transports.File({
        level: "warn",
        filename: "logs/logsWarnings.log",
      }),
      new transports.File({
        level: "error",
        filename: "logs/logErrors.log",
      }),
      new transports.Console(),
      new MongoDB({
        db: process.env.MONGO_URI,
        collection: "logs",
        level: "info",
        options: { useUnifiedTopology: true },
        filename: "logs/MongoDB.log",
      }),
    ],
    format: format.combine(
      format.json(),
      format.timestamp(),
      format.prettyPrint()
    ),
    statusLevels: true,
  })
);

/* logger end */
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(expressStatic(join(__dirname, "public")));

app.use(limiter);

app.use(
  cors({
    origin: [URL, `http://localhost:${PORT}`],
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

app.get("/400", (req, res) => {
  res.sendStatus(400);
});

app.get("/500", (req, res) => {
  res.sendStatus(500);
});

app.use(errorHandler);

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (e) {
    console.log("Error connecting to database:", e.message);
  }
}

app.listen(PORT, () => {
  try {
    connect();
    console.log(`Server up on port ${PORT}`);
  } catch (e) {
    console.error("Error starting the server:", e.message);
  }
});