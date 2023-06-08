"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const authentication_1 = require("../middlewares/authentication");
const validation_1 = require("../middlewares/validation");
const product_schema_1 = __importDefault(require("../schemas/product.schema"));
const productRoute = (0, express_1.Router)();
productRoute.route("/create/:userId").post(authentication_1.Authenticate, (0, validation_1.validate)(product_schema_1.default), products_controller_1.createProducts);
exports.default = productRoute;
