import { Router } from "express";
import {
  allUsers,
  getUser,
  login,
  register,
  logout,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", protect, logout);
authRouter.post("/users", protect, allUsers);
authRouter.post("/get", protect, getUser);
export default authRouter;
