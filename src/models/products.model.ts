import { Optional, Model, DataTypes, BelongsToGetAssociationMixin } from 'sequelize';
import sequelize from '../config/config';
import User from './user.model';

interface ProductAttributes {
  id: number;
  productName: string;
  description: string;
  price: number;
  imageId: string;
  cloudId: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id' | 'createdAt' | 'updatedAt' | "userId">;

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

  public static associate(models: any): void {
    Product.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
        model: 'users',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: 'products',
  }
);



Product.belongsTo(User, { foreignKey: "userId" })
User.hasMany(Product, { foreignKey: "userId" })

Product.sync().then(() => {
  console.log("Table created.");
}).catch((err) => {
  console.log(err.message);
})

export default Product;