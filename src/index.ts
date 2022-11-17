import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { User } from "./interface/user";

dotenv.config({ path: "./config.env" });

const app: Express = express();

app.use(express.json());

app.get("/users", (req: Request, res: Response<User[]>) => {
  res.status(200).json([
    {
      name: "Bola",
      dob: "17 december",
      age: 45,
      address: "Shina bola close",
    },
  ]);
});

export default app;
