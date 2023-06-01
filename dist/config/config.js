"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize({
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
