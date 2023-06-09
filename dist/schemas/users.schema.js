"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userSchema = (0, zod_1.object)({
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
    }),
    age: (0, zod_1.number)({
        required_error: "age is required."
    })
});
exports.default = userSchema;
