import { Model, DataTypes, Optional, BelongsToGetAssociationMixin, Sequelize } from "sequelize";
import sequelize from "../config/config";
import { ProductAttributes } from "../interfaces/product.interface";
import User from "./user.model"; // Import the User model

type ProductCreationAttributes = Optional<ProductAttributes, "id" | "createdAt" | "updatedAt">;

class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  public id!: number;
  public productName!: string;
  public description!: string;
  public price!: number;
  public imageId!: string;
  public cloudId!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUser!: BelongsToGetAssociationMixin<User>;

  // public static associate(models: { User: typeof User }): void {
  //   Product.belongsTo(models.User, { foreignKey: "userId" });
  // }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cloudId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);

// Product.associate({ User }); // Pass the User model to the associate method

Product.sync({ force: true }).then(() => {
  console.log("Table created.");
}).catch((err) => {
  console.log(err.message);
})

export default Product;