import { ZodSchema, z, string, object } from 'zod';

type UserAttributes = {
  name: string,
  email: string,
  age: number,
  password: string
};
// Define the schema using Zod
export const signUpSchema: ZodSchema<UserAttributes> = z.object({
  name: z.string().nonempty().min(1, 'Name is required.'),
  email: z.string().nonempty().email('Invalid email format.'),
  age: z.number().positive('Age must be a positive number.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

type loginAttribute = {
  email: string;
  password: string;
};

export const loginSchema: ZodSchema<loginAttribute> = object({
  email: string().nonempty().email(),
  password: string().nonempty().min(1),
});


