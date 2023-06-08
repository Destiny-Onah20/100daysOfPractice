import { Router } from "express";
import { createProducts } from "../controllers/products.controller";
import { Authenticate } from "../middlewares/authentication";
import { multerUpload } from "../middlewares/multer";
import { validate } from "../middlewares/validation";
import productSchema from "../schemas/product.schema";

const productRoute = Router();

productRoute.route("/create/:userId").post(Authenticate, validate(productSchema), createProducts);



export default productRoute;