import { Router } from "express";
import { createUser, getUsers } from "../controllers/user-controllers";
import validateUser from "../middleware/validation/user-validation";

const router = Router();

router.get("/", getUsers);

export default router;
