import { Model, DataTypes, Optional, BelongsToGetAssociationMixin } from "sequelize";
import sequelize from "../config/config";
import { ProductAttributes } from "../interfaces/product.interface";
import User from "./user.model";


type productCreationAttributes = Optional<ProductAttributes, "id" | "createdAt" | "updatedAt">;

export class Product extends Model<ProductAttributes, productCreationAttributes> {
  public id!: string;
  public productName!: string;
  public description!: string;
  public price!: number;
  public file!: string;
  public cloudId!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUser!: BelongsToGetAssociationMixin<User>;
  public static associate(models: { User: typeof User }): void {
    Product.belongsTo(models.User, { foreignKey: "userId" })
  }
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
  imageId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cloudId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id"
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {
  sequelize,
  tableName: "products"
});

Product.associate({ User })

Product.sync().then(() => {
  console.log("Product Table created.");
}).catch((err) => {
  console.log(err.message);

})