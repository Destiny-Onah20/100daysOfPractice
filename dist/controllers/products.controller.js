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
const products_model_1 = __importDefault(require("../models/products.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const createProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = req.params.userId;
        console.log(userId);
        const { productName, description, price, } = req.body;
        const validUser = yield user_model_1.default.findOne({ where: { id: userId } });
        if (!validUser) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }
        if (!req.files) {
            throw new Error('No file uploaded');
        }
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.imageId;
        if (!file || file.length === 0) {
            throw new Error('No file uploaded');
        }
        const uploads = Array.isArray(file) ? file : [file];
        for (const file of uploads) {
            const result = yield cloudinary_1.default.uploader.upload(file.tempFilePath);
            const data = {
                productName,
                description,
                price,
                imageId: result.secure_url,
                cloudId: result.public_id,
                userId: Number(userId)
            };
            const postProduct = yield products_model_1.default.create(data);
            return res.status(201).json({
                message: 'Product posted.',
                data: postProduct,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.createProducts = createProducts;
