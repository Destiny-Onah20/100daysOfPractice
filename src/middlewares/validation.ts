import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodType, z } from "zod";
import { signUpSchema } from "../schemas/users.schema";

const schemaObj = z.object({
  body: z.object({}),
  query: z.object({}),
  params: z.object({}),
});
type UserAttributes = {
  name: string,
  email: string,
  age: number,
  password: string
};
export const validates = (schema: ZodType<UserAttributes>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schemaObj.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    schema.parse(req.body)
    next();
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


type loginAttribute = {
  email: string;
  password: string;
};

export const validateLogin = (schema: ZodType<loginAttribute>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schemaObj.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    schema.parse(req.body)
    next();
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

