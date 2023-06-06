"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProducts = void 0;
const cloudinary_1 = __importDefault(require("../middlewares/cloudinary"));
const products_model_1 = require("../models/products.model");
const createProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, description, price, imageId, cloudId } = req.body;
        console.log(req.body);
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        const result = yield cloudinary_1.default.uploader.upload(req.file.path);
        const data = {
            productName,
            description,
            price,
            imageId: result.secure_url,
            cloudId: result.public_id,
        };
        const postProduct = yield products_model_1.Product.create(data);
        res.status(201).json({
            message: 'Product posted.',
            data: postProduct,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.createProducts = createProducts;
