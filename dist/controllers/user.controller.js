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
exports.logIn = exports.signUp = void 0;
const user_model_1 = require("../models/user.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailService_1 = __importDefault(require("../middlewares/mailService"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, email, password } = req.body;
        // check if the user Exists
        const checkEmail = yield user_model_1.User.findOne({ where: { email: email } });
        if (checkEmail) {
            return res.status(409).json({
                message: "Email already Exists"
            });
        }
        console.log("hello");
        const saltedPassword = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, saltedPassword);
        const data = {
            name,
            age,
            email,
            password: hashedPassword
        };
        const newUser = new user_model_1.User(data);
        const genToken = jsonwebtoken_1.default.sign({
            name: newUser.name,
            id: newUser.id
        }, "process.env.TOKEN_SEC", { expiresIn: "1hr" });
        newUser.token = genToken;
        yield newUser.save();
        const verify = `${req.protocol}://${req.get("host")}/api/verify/${newUser.id}`;
        const message = `welcome cheif ${newUser.name} use this link to verify your account ${verify}`;
        const mail = new mailService_1.default();
        mail.mail({
            email: newUser.email,
            subject: "Kindly verify email.",
            message
        });
        return res.status(201).json({
            data: newUser
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.signUp = signUp;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const validEmail = yield user_model_1.User.findOne({ where: { email } });
        if (!validEmail) {
            return res.status(404).json({
                message: "Email does not exists."
            });
        }
        const verifyPassword = yield bcrypt_1.default.compare(password, validEmail.password);
        if (!verifyPassword) {
            return res.status(400).json({
                message: "Password is not correct."
            });
        }
        const genToken = jsonwebtoken_1.default.sign({
            name: validEmail.name,
            id: validEmail.id
        }, "process.env.TOKEN_SEC", { expiresIn: "1hr" });
        validEmail.token = genToken;
        yield validEmail.save();
        return res.status(200).json({
            message: "Login Successsful."
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
exports.logIn = logIn;
