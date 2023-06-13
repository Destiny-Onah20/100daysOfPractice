"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validates = void 0;
const zod_1 = require("zod");
const schemaObj = zod_1.z.object({
    body: zod_1.z.object({}),
    query: zod_1.z.object({}),
    params: zod_1.z.object({}),
});
const validates = (schema) => (req, res, next) => {
    try {
        schemaObj.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        schema.parse(req.body);
        next();
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.validates = validates;
const validateLogin = (schema) => (req, res, next) => {
    try {
        schemaObj.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        schema.parse(req.body);
        next();
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.validateLogin = validateLogin;
