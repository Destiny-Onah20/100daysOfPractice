import { number, object, string } from "zod";

export const userSchema = object({
  body: object({
    name: string({
      required_error: "Name is required."
    }),
    email: string({
      required_error: "Email is required."
    }).email("Invalid Email format.")
  }),
  password: string({
    required_error: "Password is required."
  }),
  age: number({
    required_error: "age is required."
  })
});