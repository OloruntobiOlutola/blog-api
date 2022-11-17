import mongoose from "mongoose";
import joi from "joi";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  address: String,
  password: String,
  passwordConfirm: String,
});

export const userValidation = joi.object({
  name: joi.string().alphanum().min(3).max(20).trim(true).required(),
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
  passwordConfirm: joi.ref("password"),
});

const User = mongoose.model("User", userSchema);

export default User;
