import { Model, DataTypes, Optional} from "sequelize";
import sequelize from "../config/config";
import ProductAttributes from "../interfaces/product.interface";


type productCreationAttributes = Optional<ProductAttributes, "id" | "createdAt" | "updatedAt">;

export class Product extends Model <ProductAttributes, productCreationAttributes> {
  public id!: string;
  public productName!: string;
  public description!: string;
  public price! : number;
  public image!: string;
  public cloudId! : string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
};

Product.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cloudId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
},{
  sequelize,
  tableName: "products"
})

Product.sync().then(()=>{
  console.log("Product Table created.");
}).catch((err)=>{
  console.log(err.message);
  
})