import { Router } from "express";

import {
  registerUserController,
  loginUserController,
  fetchUserController,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/auth/register").post(registerUserController);

userRouter.route("/auth/login").post(loginUserController);

userRouter.route("/profile").get(fetchUserController);

export default userRouter;
