import { Router , Request, Response} from "express";
import { signUp } from "../controllers/user.controller";

const userRoute = Router();

userRoute.route("/register").post(signUp);
userRoute.route("/").get((req:Request, res: Response)=>{
  res.send("Welcome to Kora")
})

export default userRoute;