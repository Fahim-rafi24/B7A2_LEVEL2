"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const ApiError_1 = require("../utils/ApiError");
const AsyncHandler_1 = require("../utils/AsyncHandler");
const status_1 = require("../config/status");
exports.verifyJWT = (0, AsyncHandler_1.AsyncHandler)(async (req, res, next) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        throw new ApiError_1.ApiError(status_1.statusCode.UNAUTHORIZED, "Unauthorized request: No access token found");
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, env_1.configENV.accessTokenSecret);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        console.error("JWT Verification Error:", error);
        throw new ApiError_1.ApiError(status_1.statusCode.UNAUTHORIZED, "Invalid or expired access token");
    }
});
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new ApiError_1.ApiError(status_1.statusCode.FORBIDDEN, "Forbidden: Insufficient permissions");
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
//# sourceMappingURL=auth.middleware.js.map