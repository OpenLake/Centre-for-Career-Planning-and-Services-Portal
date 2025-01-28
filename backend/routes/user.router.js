import { Router } from "express";
import { logoutUser, registerUser,updatePassword } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").post(verifyJWT, logoutUser);


userRouter.route("/updatePassword").patch(updatePassword);
export { userRouter };
