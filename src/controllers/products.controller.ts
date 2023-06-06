import { RequestHandler } from 'express';
import Cloudinary from '../middlewares/cloudinary';
import { productDataInterface } from '../interfaces/product.interface';
import { Product } from '../models/products.model';

export const createProducts: RequestHandler = async (req, res) => {
  try {
    const { productName, description, price, imageId, cloudId } = req.body;
    console.log(req.body);

    if (!req.file) {
      throw new Error('No file uploaded');
    }
    const result = await Cloudinary.uploader.upload(req.file.path);

    const data: productDataInterface = {
      productName,
      description,
      price,
      imageId: result.secure_url,
      cloudId: result.public_id,
    };

    const postProduct = await Product.create(data);

    res.status(201).json({
      message: 'Product posted.',
      data: postProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};