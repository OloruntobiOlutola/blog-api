import express, { Express, Request, Response } from "express";
import fs from "fs";
import morgan from "morgan";
import path from "path";
import ErrorHandler from "./controllers/error-controllers";

const app: Express = express();

app.use(express.json());

let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use(ErrorHandler);

export default app;
