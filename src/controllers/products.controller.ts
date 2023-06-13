import { RequestHandler, Request, Response } from 'express';
import Cloudinary from '../middlewares/cloudinary';
import { productDataInterface } from '../interfaces/product.interface';
import Product from '../models/products.model';
import User from '../models/user.model';
import fileUpload from 'express-fileupload';

export const createProducts = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userid;
    const theUser = await User.findAll({ where: { id: userId } })
    const { productName, description, price } = req.body;
    // console.log(req.files);

    if (!req.files) {
      throw new Error('No file uploaded');
    }
    console.log(req.files.imageId);
    const files = req.files.imageId as fileUpload.UploadedFile[];
    const file = files[0]
    const result = await Cloudinary.uploader.upload(file.tempFilePath)
    const { secure_url: imageId, public_id: cloudId } = result;

    const data: productDataInterface = {
      productName,
      description,
      price,
      imageId,
      cloudId,
      userId: theUser[0].id
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