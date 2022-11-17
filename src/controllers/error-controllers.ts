import { NextFunction, Request, Response } from "express";
import ErrorObject from "../utils/error";

const { NODE_ENV } = process.env;

const handleCastError = (err: any) => {
  let message = `The ${err.path} does not contain ${err.value}`;
  return new ErrorObject(message, 400);
};

const handleWebTokenError = (err: any) => new ErrorObject(err.message, 401);

const devError = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const prodError = (err: any, res: Response) => {
  if (err.operational === true) {
    res.status(404).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (NODE_ENV === "development") {
    devError(err, res);
  } else {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastError(error);
    if (error.name === "JsonWebTokenError") error = handleWebTokenError(error);
    prodError(error, res);
  }
  next();
};

export default ErrorHandler;
