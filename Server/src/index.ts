import express, { Application, Request, Response } from "express";
import mongoose, { Mongoose } from "mongoose";

import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3001;
const allowedOrigins: string[] = ["http://localhost:5127", "http://localhost:27017"];

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

app.get("/", (req: Request, res: Response) => {
  const ip = req.ip;
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Rad-Repost: Welcome</title>
      </head>
      <body>
        <style> *{margin:0; padding:0; box-sizing:border-box; } </style>
        <h1 style="text-align:center;">WELCOME TO THE GULAG</h1>
        <p style="text-align:center;">Server Started at ${ip}:${PORT}</p>
        
      </body>
    </html>
  `);
});

const uri: string = process.env.MONGO_URI ?? "";

type ConnectionOptionsExtend = {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  useCreateIndex: boolean;
  useFindAndModify: boolean;
  user?: string;
  pass?: string;
};

const options: ConnectionOptionsExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD
};

mongoose
  .connect(uri, options)
  .then((_connection: Mongoose) => {
    console.log("Connected to MongoDB");
  })
  .catch((error: Error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
