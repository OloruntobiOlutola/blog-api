import { NextFunction, Request, Response } from "express";
import { IUser } from "../interface/user";
import User from "../model/user-model";
import catchAsync from "../utils/catch-async";

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      user,
    });
  }
);

export const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
    res.status(201).json({
      status: "success",
      users,
    });
  }
);
