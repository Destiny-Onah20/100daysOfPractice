"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const users_route_1 = __importDefault(require("./routers/users.route"));
const product_route_1 = __importDefault(require("./routers/product.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use("/uploaded-image", express_1.default.static("./upload"));
app.use((0, express_fileupload_1.default)({
    useTempFiles: true
}));
app.use("/api/v1", users_route_1.default);
app.use("/api/v1", product_route_1.default);
exports.default = app;
