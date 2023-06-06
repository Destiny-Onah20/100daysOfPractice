"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SEC
});
// const storage = v2({
//   cloudinary: Cloudinary,
//   folder: '../uploads', // Specify the folder in Cloudinary where the files will be uploaded
//   allowedFormats: ['jpg', 'png', 'jpeg'],
//   filename: function (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
//     callback(null, Date.now() + '-' + file.originalname);
//   },
// });
exports.default = cloudinary_1.v2;
