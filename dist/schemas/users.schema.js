"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required."
        }),
        email: (0, zod_1.string)({
            required_error: "Email is required."
        }).email("Invalid Email format.")
    }),
    password: (0, zod_1.string)({
        required_error: "Password is required."
    }).min(6),
});
