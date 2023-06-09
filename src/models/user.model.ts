// import {  DataType, Column, Table} from "sequelize-typescript";
import { Optional, Model, DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin } from "sequelize";
import UserAttributes from "../interfaces/user.interface";
import sequelize from "../config/config";
import { Product } from "./products.model";




type UserCreationAttributes = Optional<UserAttributes, 'id' | "token" | "status" | "createdAt" | "updatedAt">;

class User extends Model<UserAttributes, UserCreationAttributes>{
  public id!: number;
  public name!: string;
  public email!: string;
  public status!: boolean;
  public age!: number;
  public token!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getProducts!: HasManyGetAssociationsMixin<Product>;
  public addProduct!: HasManyAddAssociationMixin<Product, "id">;

  public static associate(models: { Product: typeof Product }): void {
    User.hasMany(models.Product, { foreignKey: "userId" })
  }
};

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  tableName: "users"
});

User.associate({ Product })

User.sync({ force: true }).then(() => {
  console.log("TAble created.");
}).catch((err) => {
  console.log(err.message);
});

export default User;