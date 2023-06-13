"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize({
    database: "hotelbooking",
    username: "root",
    password: "123456789",
    dialect: "mysql",
    host: "127.0.0.1",
    define: {
        timestamps: true,
    },
});
exports.default = sequelize;
