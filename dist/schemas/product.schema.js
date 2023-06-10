"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
exports.productSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        productName: (0, zod_1.string)({
            required_error: "This field should not be empty."
        }),
        description: (0, zod_1.string)({
            required_error: "This field should not be empty."
        }),
        price: (0, zod_1.number)({
            required_error: "This field should not be empty.",
            invalid_type_error: "must be a number"
        }),
        userid: (0, zod_1.number)()
    })
});
