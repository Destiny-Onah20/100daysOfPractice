import { Router } from "express";
import { allProducts, createProducts } from "../controllers/products.controller";
import { authAccess } from "../middlewares/authentication";

const productRoute = Router();

productRoute.route("/create/:userId").post(authAccess, createProducts);
productRoute.route("/product/products").get(allProducts)



export default productRoute;