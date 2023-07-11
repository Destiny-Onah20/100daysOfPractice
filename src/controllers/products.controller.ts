import { RequestHandler, Request, Response } from 'express';
import Product from '../models/products.model';
import { UploadedFile } from 'express-fileupload';
import User from '../models/user.model';
import * as admin from "firebase-admin";
import { ServiceAccount, firestore, storage, initializeApp } from "firebase-admin";
import { serviceAccount } from '../utils/firebase';


export const createProducts = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    console.log(userId);

    const { productName, description, price, } = req.body;
    const validUser = await User.findOne({ where: { id: userId } })
    if (!validUser) {
      return res.status(404).json({
        message: 'User not found!'
      })
    }
    try {
      admin.initializeApp({
        credential: admin.credential.cert((serviceAccount as ServiceAccount)),
        storageBucket: process.env.STORE_BUCK,
      });
    } catch (error: any) {
      console.log(error);
    }
    if (!req.files) {
      throw new Error('No file uploaded');
    }
    const bucket = storage().bucket();
    const initFirestore = firestore()
    const file = req.files?.imageId as UploadedFile[];
    if (!file || file.length === 0) {
      throw new Error('No file uploaded');
    }
    const uploads = Array.isArray(file) ? file : [file]
    for (const file of uploads) {
      // const result = await Cloudinary.uploader.upload(file.tempFilePath);
      const uploadPath = `uploads/${file.tempFilePath}`;
      const fileRef = bucket.file(uploadPath);

      // Upload the file to Firebase Cloud Storage
      const snapshot = await fileRef.save(file.data, {
        metadata: {
          contentType: file.mimetype,
        },
      })

      const url = `https://storage.googleapis.com/${bucket.name}/${uploadPath}`;
      // const theUrl = await getDownloadURL(ref(getStorage()))
      interface productDataInterface {
        productName: string;
        description: string;
        price: number;
        imageId: string;
        cloudId: string;
        userId: number
      }
      const data: productDataInterface = {
        productName,
        description,
        price,
        imageId: url,
        cloudId: "result.public_id",
        userId: Number(userId)
      };
      const postProduct = await Product.create(data);
      return res.status(201).json({
        message: 'Product posted.',
        data: postProduct,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const allProducts: RequestHandler = async (req, res) => {
  try {
    const products = await Product.findAll();
    if (products.length === 0) {
      return res.status(404).json({
        message: "Sorry no products for now!"
      })
    } else {
      return res.status(200).json({
        message: "All products " + products.length,
        data: products
      })
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
};