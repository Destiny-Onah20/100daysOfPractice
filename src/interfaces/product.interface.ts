interface ProductAttributes {
  id : number;
  productName: string;
  description: string;
  price: number;
  image: string;
  cloudId: string;
  createdAt: Date,
  updatedAt: Date
};

export default ProductAttributes;