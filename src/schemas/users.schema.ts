import { object, string, z } from "zod";

export const userSchema = object({
  body: object({
    name: string({
      required_error: "Name is required.",
    }),
    email: string({
      required_error: "Email is required.",
    }).email("Invalid Email format."),
  }),
  password: string({
    required_error: "Password is required.",
  }).min(6),
});

export type userInput = z.infer<typeof userSchema> & {
  error?: {
    message: string;
  };
};