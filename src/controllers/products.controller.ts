import { RequestHandler, Request, Response } from 'express';
import Cloudinary from '../middlewares/cloudinary';
import { productDataInterface } from '../interfaces/product.interface';
import Product from '../models/products.model';
import { UploadedFile } from 'express-fileupload';
import User from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

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
    if (!req.files) {
      throw new Error('No file uploaded');
    }

    const file = req.files?.imageId as UploadedFile[];
    if (!file || file.length === 0) {
      throw new Error('No file uploaded');
    }
    const uploads = Array.isArray(file) ? file : [file]
    for (const file of uploads) {
      const result = await Cloudinary.uploader.upload(file.tempFilePath);

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
        imageId: result.secure_url,
        cloudId: result.public_id,
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