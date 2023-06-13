import { Router } from "express";
import { createProducts } from "../controllers/products.controller";
import { authAccess } from "../middlewares/authentication";

const productRoute = Router();

productRoute.route("/create/:userId").post(authAccess, createProducts);



export default productRoute;