import Joi from "joi";
export interface productDataInterface {
  productName: string;
  description: string;
  price: number;
  imageId: string;
  cloudId: string;
  userId: number;
}
export const validateProduct = (product: productDataInterface) => {
  const productSchema = Joi.object({
    productName: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    price: Joi.number().min(1).required(),
    imageId: Joi.string().required(),
    cloudId: Joi.string().required(),
    userId: Joi.any()
  })
  return productSchema.validate(product)
};