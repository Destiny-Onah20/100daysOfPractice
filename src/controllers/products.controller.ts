import { RequestHandler } from 'express';
import Cloudinary from '../middlewares/cloudinary';
import { productDataInterface } from '../interfaces/product.interface';
import { Product } from '../models/products.model';
import User from '../models/user.model';

export const createProducts: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findAll({ where: { id: userId } })
    const { productName, description, price } = req.body;
    // console.log(req.files);

    if (!req.files) {
      throw new Error('No file uploaded');
    }
    console.log(req.files.imageId);

    const result = await Cloudinary.uploader.upload(req.files.imageId.tempFilePath)
    const { secure_url: imageId, public_id: cloudId } = result;
    // console.log(imageId);


    const data: productDataInterface = {
      productName,
      description,
      price,
      imageId,
      cloudId,
      userId: user[0].id
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