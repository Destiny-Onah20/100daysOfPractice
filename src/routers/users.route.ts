import { Router, Request, Response } from "express";
import { changePassword, forgetPassword, logIn, signUp, verifyUser } from "../controllers/user.controller";
import { validateLogin, validates } from "../middlewares/validation";
import { loginSchema, signUpSchema } from "../schemas/users.schema";


const userRoute = Router();

userRoute.post("/register", validates(signUpSchema), signUp);
userRoute.route("/").get((req: Request, res: Response) => {
  res.send("Welcome to Kora")
});
userRoute.route("/login").post(validateLogin(loginSchema), logIn);
userRoute.route("/verify/:userId").post(verifyUser);
userRoute.route("forgot").post(forgetPassword)

export default userRoute;