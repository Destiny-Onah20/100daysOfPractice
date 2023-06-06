import { Router, Request, Response } from "express";
import { logIn, signUp, verifyUser } from "../controllers/user.controller";

const userRoute = Router();

userRoute.route("/register").post(signUp);
userRoute.route("/").get((req: Request, res: Response) => {
  res.send("Welcome to Kora")
});
userRoute.route("/login").post(logIn);
userRoute.route("/verify/:userId").post(verifyUser)

export default userRoute;