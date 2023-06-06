import { User } from "../models/user.model";
import dotenv from "dotenv";
dotenv.config()
import { RequestHandler, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { where } from "sequelize";
import mailSender from "../middlewares/mailService";


export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, age, email, password } = req.body;

    // check if the user Exists
    const checkEmail = await User.findOne({ where: { email: email } });
    if (checkEmail) {
      return res.status(409).json({
        message: "Email already Exists"
      })
    }
    console.log("hello");

    const saltedPassword = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, saltedPassword);
    type UserAttributes = {
      name: string,
      email: string,
      age: number,
      password: string
    };
    const data: UserAttributes = {
      name,
      age,
      email,
      password: hashedPassword
    }
    const newUser = new User(data);
    const genToken = jwt.sign({
      name: newUser.name,
      id: newUser.id
    }, "process.env.TOKEN_SEC", { expiresIn: "1hr" })
    newUser.token = genToken;
    await newUser.save();
    const verify = `${req.protocol}://${req.get("host")}/api/verify/${newUser.id}`;
    const message = `welcome cheif ${newUser.name} use this link to verify your account ${verify}`;
    const Sendmail = new mailSender();
    Sendmail.createConnection()
    Sendmail.mail({
      from: process.env.EMAIL,
      email: newUser.email,
      subject: "Kindly verify email.",
      message
    })

    return res.status(201).json({
      data: newUser
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const validEmail = await User.findOne({ where: { email } });
    if (!validEmail) {
      return res.status(404).json({
        message: "Email does not exists."
      });
    }
    const verifyPassword = await bcrypt.compare(password, validEmail.password);
    if (!verifyPassword) {
      return res.status(400).json({
        message: "Password is not correct."
      })
    }
    const genToken = jwt.sign({
      name: validEmail.name,
      id: validEmail.id
    }, "process.env.TOKEN_SEC", { expiresIn: "1hr" })
    validEmail.token = genToken;
    await validEmail.save();
    return res.status(200).json({
      message: "Login Successsful.",
      data: validEmail
    })
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    })
  }
};

export const verifyUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.update({ status: false }, { where: { id: userId } })
    return res.status(200).json({
      message: "User now verified."
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
}