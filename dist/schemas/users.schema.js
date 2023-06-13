"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
// Define the schema using Zod
exports.signUpSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty().min(1, 'Name is required.'),
    email: zod_1.z.string().nonempty().email('Invalid email format.'),
    age: zod_1.z.number().positive('Age must be a positive number.'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long.'),
});
exports.loginSchema = (0, zod_1.object)({
    email: (0, zod_1.string)().nonempty().email(),
    password: (0, zod_1.string)().nonempty().min(1),
});
