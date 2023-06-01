import { User } from "../models/user.model";
import dotenv from "dotenv";
dotenv.config()
import { RequestHandler, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export const signUp = async( req: Request , res: Response )=>{
  try {
    const { name, age , email , password} = req.body;

  // check if the user Exists
  const checkEmail = await User.findOne({where: {email: email}});
  if(checkEmail){
    return res.status(409).json({
       message : "Email already Exists"
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
  const data: UserAttributes =  {
    name,
    age,
    email,
    password: hashedPassword
  }
  const newUser = new User(data);
  const genToken = jwt.sign({
  name: newUser.name,
  id: newUser.id
  }, "process.env.TOKEN_SEC", {expiresIn: "1hr"})
  newUser.token = genToken;
  await newUser.save();
  
  return res.status(201).json({
    data: newUser
  })
  } catch (error) {
    return res.status(500).json({
      message: error
    })
  }
};