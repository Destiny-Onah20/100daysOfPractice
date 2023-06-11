"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validation_1 = require("../middlewares/validation");
const users_schema_1 = require("../schemas/users.schema");
const userRoute = (0, express_1.Router)();
userRoute.post("/register", (0, validation_1.validate)(users_schema_1.userSchema), user_controller_1.signUp);
userRoute.route("/").get((req, res) => {
    res.send("Welcome to Kora");
});
userRoute.route("/login").post(user_controller_1.logIn);
userRoute.route("/verify/:userId").post(user_controller_1.verifyUser);
userRoute.route("forgot").post(user_controller_1.forgetPassword);
exports.default = userRoute;
