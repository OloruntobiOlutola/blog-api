import express, { Express, NextFunction, Request, Response } from "express";
import fs from "fs";
import morgan from "morgan";
import path from "path";
import userRouter from "./routes/user-routes";
import ErrorHandler from "./controllers/error-controllers";
import catchAsync from "./utils/catch-async";
import User from "./model/user-model";

const app: Express = express();

app.use(express.json());

let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api/v1/users", userRouter);

app.use(ErrorHandler);

export default app;
