"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRoute = (0, express_1.Router)();
userRoute.route("/register").post(user_controller_1.signUp);
userRoute.route("/").get((req, res) => {
    res.send("Welcome to Kora");
});
userRoute.route("/login").post(user_controller_1.logIn);
userRoute.route("/verify/:userId").post(user_controller_1.verifyUser);
exports.default = userRoute;
