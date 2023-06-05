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
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class mailSender {
    // public constructor(){
    // }
    static getInstance() {
        if (!mailSender.instance) {
            mailSender.instance = new mailSender();
        }
        return mailSender.instance;
    }
    ;
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            this.transporter = nodemailer_1.default.createTransport({
                service: process.env.SERVICE,
                secure: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });
        });
    }
    mail(Option) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transporter.sendMail({
                from: process.env.EMAIL,
                to: Option.email,
                subject: Option.subject,
                text: Option.text
            });
        });
    }
}
exports.default = mailSender;
