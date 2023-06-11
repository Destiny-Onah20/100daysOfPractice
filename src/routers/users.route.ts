import { Router, Request, Response } from "express";
import { changePassword, forgetPassword, logIn, signUp, verifyUser } from "../controllers/user.controller";
import { validate } from "../middlewares/validation";
import { userSchema } from "../schemas/users.schema";

const userRoute = Router();

userRoute.post("/register", validate(userSchema), signUp);
userRoute.route("/").get((req: Request, res: Response) => {
  res.send("Welcome to Kora")
});
userRoute.route("/login").post(logIn);
userRoute.route("/verify/:userId").post(verifyUser);
userRoute.route("forgot").post(forgetPassword)

export default userRoute;