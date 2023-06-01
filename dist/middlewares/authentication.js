"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = req.params.userId;
        const findUser = yield user_model_1.User.findAll({ where: { id: userId } });
        if (!findUser) {
            return res.status(409).json({
                message: "Not authorized."
            });
        }
        const userToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (userToken) {
            jsonwebtoken_1.default.verify(userToken, "process.env.TOKEN_SEC", (error, payLoad) => {
                if (error) {
                    res.status(401).json({
                        message: "You not authorized."
                    });
                }
                else {
                    res.locals.jwt = payLoad;
                    next();
                }
            });
        }
        else {
            res.status(400).json({
                message: "Unauthorized."
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error
        });
    }
});
exports.Authenticate = Authenticate;
