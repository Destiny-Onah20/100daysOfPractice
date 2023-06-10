import { number, object, string, z } from "zod";


export const productSchema = object({
  body: object({
    productName: string({
      required_error: "This field should not be empty."
    }),
    description: string({
      required_error: "This field should not be empty."
    }),
    price: number({
      required_error: "This field should not be empty.",
      invalid_type_error: "must be a number"
    }),
    userid: number()
  })
});

export type productInput = z.infer<typeof productSchema>;
