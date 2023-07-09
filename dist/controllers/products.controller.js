"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const products_model_1 = __importDefault(require("../models/products.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const admin = __importStar(require("firebase-admin"));
const firebase_admin_1 = require("firebase-admin");
const firebase_1 = require("../utils/firebase");
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
        try {
            admin.initializeApp({
                credential: admin.credential.cert(firebase_1.serviceAccount),
                storageBucket: process.env.STORE_BUCK,
            });
        }
        catch (error) {
            console.log(error);
        }
        if (!req.files) {
            throw new Error('No file uploaded');
        }
        const bucket = (0, firebase_admin_1.storage)().bucket();
        const initFirestore = (0, firebase_admin_1.firestore)();
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.imageId;
        if (!file || file.length === 0) {
            throw new Error('No file uploaded');
        }
        const uploads = Array.isArray(file) ? file : [file];
        for (const file of uploads) {
            // const result = await Cloudinary.uploader.upload(file.tempFilePath);
            const uploadPath = `uploads/${file.tempFilePath}`;
            const fileRef = bucket.file(uploadPath);
            // Upload the file to Firebase Cloud Storage
            const snapshot = yield fileRef.save(file.data, {
                metadata: {
                    contentType: file.mimetype,
                },
            });
            const url = `https://storage.googleapis.com/${bucket.name}/${uploadPath}`;
            const data = {
                productName,
                description,
                price,
                imageId: url,
                cloudId: "result.public_id",
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
