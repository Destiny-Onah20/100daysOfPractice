import { Router } from "express";
import { createProducts } from "../controllers/products.controller";
import { Authenticate } from "../middlewares/authentication";
import { multerUpload } from "../middlewares/multer";

const productRoute = Router();

productRoute.route("/create/:userId").post( Authenticate,  createProducts)


export default productRoute;