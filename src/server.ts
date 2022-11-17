import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./index";

const { DB_URL } = process.env;

const port = 4000;

mongoose
  .connect(DB_URL ? DB_URL : "wewq")
  .then(() => console.log("connected to Db"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || port, () =>
  console.log(`Server is running at port ${port}`)
);
