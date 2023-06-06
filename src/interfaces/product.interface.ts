export interface ProductAttributes {
  id: number;
  productName: string;
  description: string;
  price: number;
  imageId: string | undefined;
  cloudId: string;
  createdAt: Date,
  updatedAt: Date
};

// export default ProductAttributes;

export interface productDataInterface {
  productName: string;
  description: string;
  price: number;
  imageId: string | undefined;
  cloudId: string;
}