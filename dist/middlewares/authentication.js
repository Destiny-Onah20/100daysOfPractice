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
exports.authAccess = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// export const Authenticate: RequestHandler = async (req, res, next) => {
//   try {
//     const userId = req.params.userId;
//     const findUser = await User.findAll({ where: { id: userId } });
//     if (!findUser) {
//       return res.status(401).json({
//         message: "Not authorized."
//       })
//     }
//     const userToken = req.headers.authorization?.split(" ")[1];
//     if (userToken) {
//       Jwt.verify(userToken, "process.env.TOKEN_SEC", (error, payLoad) => {
//         if (error) {
//           res.status(401).json({
//             message: "You not authorized."
//           })
//         } else {
//           res.locals.jwt = payLoad;
//           next();
//         }
//       })
//     } else {
//       res.status(401).json({
//         message: "Unauthorized."
//       })
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error
//     })
//   }
// }
const authAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const findUser = yield user_model_1.default.findAll({ where: { id: userId } });
        if (!findUser) {
            return res.status(409).json({
                message: "Not authorized."
            });
        }
        ;
        const authToken = findUser[0].token;
        if (!authToken) {
            return res.status(401).json({
                message: "Not authorized."
            });
        }
        else {
            jsonwebtoken_1.default.verify(authToken, "process.env.TOKEN_SEC", (error, payLoad) => {
                if (error) {
                    res.status(401).json({
                        message: error.message
                    });
                }
                else {
                    res.locals.jwt = payLoad;
                    next();
                }
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.authAccess = authAccess;
