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
    try {
        const userId = req.params.userid;
        const user = yield user_model_1.default.findAll({ where: { id: userId } });
        const { productName, description, price } = req.body;
        // console.log(req.files);
        if (!req.files) {
            throw new Error('No file uploaded');
        }
        console.log(req.files.imageId);
        const result = yield cloudinary_1.default.uploader.upload(req.files.imageId.tempFilePath);
        const { secure_url: imageId, public_id: cloudId } = result;
        const data = {
            productName,
            description,
            price,
            imageId,
            cloudId,
            userId: user[0].id
        };
        const postProduct = yield products_model_1.default.create(data);
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
