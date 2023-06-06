import dotenv from "dotenv"
dotenv.config();
import { v2 as Cloudinary } from 'cloudinary'
import v2 from "multer-storage-cloudinary";
import multer = require("multer");

Cloudinary.config({
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

export default Cloudinary;