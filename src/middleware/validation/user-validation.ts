import { NextFunction, Request, Response } from "express";
import { userValidation } from "../../model/user-model";
import catchAsync from "../../utils/catch-async";
import ErrorObject from "../../utils/error";

const validateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    };

    const { error } = userValidation.validate(payload);
    if (error) {
      return next(
        new ErrorObject(`Error in User Data : ${error.message}`, 406)
      );
    } else {
      next();
    }
  }
);
export default validateUser;
