"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validation_1 = require("../middlewares/validation");
const users_schema_1 = __importDefault(require("../schemas/users.schema"));
const userRoute = (0, express_1.Router)();
userRoute.post("/register", (0, validation_1.validate)(users_schema_1.default), user_controller_1.signUp);
userRoute.route("/").get((req, res) => {
    res.send("Welcome to Kora");
});
userRoute.route("/login").post(user_controller_1.logIn);
userRoute.route("/verify/:userId").post(user_controller_1.verifyUser);
userRoute.route("forgot").post(user_controller_1.changePassword);
exports.default = userRoute;
