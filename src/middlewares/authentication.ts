import User from "../models/user.model";
import { RequestHandler } from "express";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

export const Authenticate: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const findUser = await User.findAll({ where: { id: userId } });
    if (!findUser) {
      return res.status(409).json({
        message: "Not authorized."
      })
    }
    const userToken = req.headers.authorization?.split(" ")[1];
    if (userToken) {
      Jwt.verify(userToken, "process.env.TOKEN_SEC", (error, payLoad) => {
        if (error) {
          res.status(401).json({
            message: "You not authorized."
          })
        } else {
          res.locals.jwt = payLoad;
          next();
        }
      })
    } else {
      res.status(400).json({
        message: "Unauthorized."
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error
    })
  }
}
