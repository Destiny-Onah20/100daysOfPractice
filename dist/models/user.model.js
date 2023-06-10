"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import {  DataType, Column, Table} from "sequelize-typescript";
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const products_model_1 = __importDefault(require("./products.model"));
class User extends sequelize_1.Model {
    static associate(model) {
        User.hasMany(model.Product, { foreignKey: "userId" });
    }
}
;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    sequelize: config_1.default,
    tableName: "users"
});
User.associate({ Product: products_model_1.default });
// User.sync({ force: true }).then(() => {
//   console.log("TAble created.");
// }).catch((err) => {
//   console.log(err.message);
// });
exports.default = User;
