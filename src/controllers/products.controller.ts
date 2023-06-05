import { Product } from "../models/products.model";
import { RequestHandler } from "express";
import { User } from "../models/user.model";
import Cloudinary from "../middlewares/cloudinary";
import { productDataInterface } from "../interfaces/product.interface";
import path from "path"

export const createProducts: RequestHandler = async( req ,res )=>{
  // console.log("hello");
  
  try {
    const { productName, description, price, imageId, cloudId } = req.body;
    res.status(200).json({
      message: 'Authorized.'
    })
    console.log("welcomd");
    // const file: string = req.files?[0].Path: imageId;
    
  const result = await Cloudinary.uploader.upload(req.files?.path.imageId, ()=>{

  })

  const data: productDataInterface = {
    productName,
    description,
    price,
    imageId : result.secure_url,
    cloudId: result.public_id
  };
  const postProduct = await Product.create(data);
  res.status(201).json({
    message: "Product posted.",
    data: postProduct
  })
  } catch (error) {
    return res.status(500).json({
      message: error
    })
  }
}