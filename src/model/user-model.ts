import mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import joi from "joi";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  address: String,
  password: {
    type: String,
    select: false,
  },
  passwordConfirm: String,
});

export const userValidation = joi.object({
  name: joi.string().min(3).max(20).trim(true).required(),
  email: joi.string().email().trim(true).required(),
  phoneNumber: joi
    .string()
    .length(11)
    .pattern(/[0]{1}[0-9]{10}/)
    .required(),
  address: joi.string(),
  password: joi
    .string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])[A-Za-z\d]{8,}/)
    .required(),
  passwordConfirm: joi.string().required().valid(joi.ref("password")),
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  let salt = await bcrypt.genSalt(10);
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
