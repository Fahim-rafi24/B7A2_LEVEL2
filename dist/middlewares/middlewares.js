"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("../config/env");
const express_1 = __importDefault(require("express"));
const middlewares = (app) => {
    app.use((0, cors_1.default)({
        origin: env_1.configENV.corsOrigin,
        credentials: true,
    }));
    app.use(express_1.default.json({ limit: env_1.configENV.api_file_size }));
    app.use(express_1.default.urlencoded({ extended: true, limit: env_1.configENV.api_file_size }));
    app.use(express_1.default.static("public"));
    app.use((0, cookie_parser_1.default)());
};
exports.middlewares = middlewares;
//# sourceMappingURL=middlewares.js.map