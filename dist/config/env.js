"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// .env
dotenv_1.default.config();
exports.configENV = {
    port: process.env.PORT || 3000,
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
    // database connection string
    db: process.env.DATABASE_URL || "",
    // api access file size
    api_file_size: "26kb",
    secret_key: process.env.SECRET_KEY || "SECRET_KEY",
    // jwt settings
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "default_access_secret",
    accessTokenTimeout: process.env.ACCESS_TOKEN_EXPIRE_MINUTES || 15,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
    refreshTokenTimeout: process.env.REFRESH_TOKEN_EXPIRE_DAYS || 7,
};
//# sourceMappingURL=env.js.map