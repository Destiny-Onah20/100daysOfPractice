"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = __importDefault(require("./config/config"));
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT;
config_1.default.authenticate().then(() => {
    console.log("Database connected");
}).then(() => {
    app_1.default.listen(port, () => {
        console.log(`Listening to port: ${port}`);
    });
}).catch((err) => {
    console.log(err.message);
});
