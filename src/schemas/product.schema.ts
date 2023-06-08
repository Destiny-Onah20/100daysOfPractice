import { number, object, string } from "zod";


const productSchema = object({
  body: object({
    productName: string({
      required_error: "This field should not be empty."
    }),
    description: string({
      required_error: "This field should not be empty."
    }),
    price: number({
      // required_error: "This field should not be empty.",
      invalid_type_error: "must be a number"
    })
  })
});
export default productSchema;