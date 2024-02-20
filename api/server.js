/* eslint-disable no-undef */
/*eslint no-undef: "error"*/
/*eslint-env node*/

import {dirname, join} from "path";
import express, {static as expressStatic} from "express";
import {format, transports} from "winston";

import {MongoDB} from "winston-mongodb";
import bodyParser from "body-parser";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorMiddleWare.js";
import expressWinston from "express-winston";
import {fileURLToPath} from "url";
import helmet from "helmet";
import mongoose from "mongoose";
import passport from "passport";
import rateLimit from "express-rate-limit";
import router from "./routes/indexRoute.js";
import session from "express-session";
import swaggerDoc from "./routes/swagger-output.json" assert {type: "json"};
import swaggerui from "swagger-ui-express";
import {error} from "console";

dotenv.config();

const {FRONTEND_URL, PORT, DB_MESSAGE, MONGO_URI} = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    session({
        secret: "keyboard cat",
        resave: true,
        saveUninitialized: true,
    }),
);

app.use(passport.initialize());
app.use(passport.authenticate("session"));

const RateLimiterHandler = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 request per 1 minute(s)
    max: 15,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(expressStatic(join(__dirname, "public")));

app.use(RateLimiterHandler);

app.use(
    cors({
        origin: [FRONTEND_URL, `http://localhost:${PORT}`],
        credentials: true,
    }),
);

/* logger */
app.use(
    expressWinston.logger({
        transports: [
            // new transports.Console(),
            new transports.File({
                level: "warn",
                filename: "logs/logsWarnings.log",
            }),

            new transports.File({
                level: "error",
                filename: "logs/logErrors.log",
            }),
            new transports.File({
                level: "success",
                filename: "logs/logSuccess.log",
            }),
            new transports.Console(),
            new MongoDB({
                db: MONGO_URI,
                collection: "logs",
                level: "info",
            }),
        ],
        format: format.combine(
            format.json(),
            format.timestamp(),
            format.prettyPrint(),
        ),
        statusLevels: true,
    }),
);
/* logger end */

app.use(errorHandler);
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));

// routes
app.use("/", router);
app.use("/", swaggerui.serve, swaggerui.setup(swaggerDoc));

async function connect() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(chalk.cyan("✅ " + DB_MESSAGE));
    } catch (e) {
        console.error(
            chalk.bgRedBright(" 🚫 Error connecting to database:", e.message),
        );
    }
}

connect()
    .then(() => {
        app.listen(PORT, () => {
            console.info(
                chalk.green(`✅ Server ------> http://localhost:${PORT}/api`),
            );
            console.info(
                chalk.yellow(
                    `✅ DATABASE ------> http://localhost:${PORT}/api/users`,
                ),
            );
            console.info(
                chalk.blue(`✅ API DOC ------> http://localhost:${PORT}`),
            );
        });
    })
    .catch((e) => {
        console.error(
            chalk.bgRedBright("🚫 Error starting the server:"),
            e.message,
        );
    });
