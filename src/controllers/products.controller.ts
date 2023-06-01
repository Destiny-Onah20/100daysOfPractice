import { Product } from "../models/products.model";
import { RequestHandler } from "express";
import { User } from "../models/user.model";
import Cloudinary from "../middlewares/cloudinary";


export const createProducts: RequestHandler = async( req ,res )=>{
  try {
    // const { productName, description, price, image, cloudId } = req.body;
    res.status(200).json({
      message: 'Authorized.'
    })
    console.log("welcomd");
    
  // const result = await Cloudinary.uploader.upload
  } catch (error) {
    return res.status(500).json({
      message: error
    })
  }
}