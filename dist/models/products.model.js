"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const user_model_1 = __importDefault(require("./user.model"));
class Product extends sequelize_1.Model {
    static associate(models) {
        Product.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    }
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    imageId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cloudId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: config_1.default,
    tableName: 'products',
});
Product.belongsTo(user_model_1.default, { foreignKey: "userId" });
user_model_1.default.hasMany(Product, { foreignKey: "userId" });
// Product.sync().then(() => {
//   console.log("Table created.");
// }).catch((err) => {
//   console.log(err.message);
// })
exports.default = Product;
