"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logger_1 = __importDefault(require("./utils/logger"));
const config_1 = __importDefault(require("./config/config"));
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT;
config_1.default.authenticate().then(() => {
    logger_1.default.info("Database connected");
}).then(() => {
    app_1.default.listen(port, () => {
        logger_1.default.info(`Listening to port: ${port}`);
    });
}).catch((err) => {
    logger_1.default.info(err.message);
});
