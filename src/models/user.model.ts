// import {  DataType, Column, Table} from "sequelize-typescript";
import { Optional, Model, DataTypes } from "sequelize";
import UserAttributes from "../interfaces/user.interface";
import sequelize from "../config/config";

// type UserAttributes = {
//   id: number,
//   name: string,
//   email: string,
//   status: boolean,
//   age: number,
//   token: string,
//   password: string,
// };

// type UserCreationAttributes = Optional<UserAttributes, 'id' | "token" | "status">;

// @Table({ tableName: "users", timestamps: true })
// export class User extends Model<UserAttributes, UserCreationAttributes> {
//   @Column({
//     type: DataType.INTEGER.UNSIGNED,
//     allowNull: false,
//     primaryKey: true
//   })
//   id!: number;
//   @Column({
//     type: DataType.STRING,
//     allowNull : false
//   })
//   name! : string;
//   @Column({
//     type: DataType.NUMBER,
//     allowNull: false
//   })
//   age! : Number;
//   @Column({
//     type: DataType.STRING,
//     allowNull : false,
//     unique: true
//   })
//   email! : string;
//   @Column({
//     type: DataType.BOOLEAN,
//     defaultValue: true,
//     allowNull : false
//   })
//   status!: Boolean;
//   @Column({
//     type: DataType.STRING
//   })
//   token! : string;
//   @Column({
//     type: DataType.STRING,
//     allowNull : false
//   })
//   password!: string
// };




type UserCreationAttributes = Optional<UserAttributes, 'id' | "token" | "status" | "createdAt" | "updatedAt">;

export class User extends Model<UserAttributes, UserCreationAttributes>{
  public id!: number;
  public name!: string;
  public email!: string;
  public status!: boolean;
  public age!: number;
  public token!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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

// User.sync({ force: true }).then(() => {
//   console.log("TAble created.");
// }).catch((err) => {
//   console.log(err.message);
// });