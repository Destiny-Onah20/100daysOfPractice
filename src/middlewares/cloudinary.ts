import dotenv from "dotenv"
dotenv.config();
import { v2 as Cloudinary} from 'cloudinary'
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer = require("multer");

Cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SEC
});

// const cloudSrorage = new CloudinaryStorage({
//   Cloudinary: Cloudinary,
//   params: {
//     allowed_formats: async (req, file) => 'png',
//     unique_filename: true,
//     folder: "../uploads"
//   }
// })

export default Cloudinary;