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
    const userId = req.params.userid;
    const { productName, description, price, } = req.body;
    // console.log(req.files);


    if (!req.files) {
      throw new Error('No file uploaded');
    }

    const files = req.files.imageId as UploadedFile[];
    if (!files || files.length === 0) {
      throw new Error('No file uploaded');
    }

    const file = files[0] as UploadedFile;
    const tempFileName = uuidv4();
    const tempFilePath = `tmp/${tempFileName}`;


    const result = await Cloudinary.uploader.upload(req.files?.imageId.tempFilePath);

    type productDataInterface = {
      productName: string;
      description: string;
      price: number;
      imageId: string;
      cloudId: string;
    }
    const data: productDataInterface = {
      productName,
      description,
      price,
      imageId: result.secure_url,
      cloudId: result.public_id,
    };
    const theUser = await User.findByPk(userId);
    if (theUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const postProduct = await Product.create(data);
    return res.status(201).json({
      message: 'Product posted.',
      data: postProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};