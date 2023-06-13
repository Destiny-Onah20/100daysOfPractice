"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = void 0;
const joi_1 = __importDefault(require("joi"));
const validateProduct = (product) => {
    const productSchema = joi_1.default.object({
        productName: joi_1.default.string().min(2).required(),
        description: joi_1.default.string().min(2).required(),
        price: joi_1.default.number().min(1).required(),
        imageId: joi_1.default.string().required(),
        cloudId: joi_1.default.string().required(),
        userId: joi_1.default.any()
    });
    return productSchema.validate(product);
};
exports.validateProduct = validateProduct;
