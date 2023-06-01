"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const authentication_1 = require("../middlewares/authentication");
const productRoute = (0, express_1.Router)();
productRoute.route("/create/:userId").post(authentication_1.Authenticate, products_controller_1.createProducts);
exports.default = productRoute;
