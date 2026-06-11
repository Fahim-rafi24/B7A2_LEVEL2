"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const AsyncHandler_1 = require("../utils/AsyncHandler");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const env_1 = require("../config/env");
const status_1 = require("../config/status");
exports.registerUser = (0, AsyncHandler_1.AsyncHandler)(async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        throw new ApiError_1.ApiError(status_1.statusCode.BAD_REQUEST, "Name, email, and password are required");
    }
    const existedUser = await (0, db_1.query)("SELECT * FROM users WHERE email = $1", [email]);
    if (existedUser.rows.length > 0) {
        throw new ApiError_1.ApiError(status_1.statusCode.CONFLICT, "User with email already exists");
    }
    const userRole = role === "maintainer" ? "maintainer" : "contributor";
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    const result = await (0, db_1.query)("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at, updated_at", [name, email, hashedPassword, userRole]);
    const createdUser = result.rows[0];
    return res.status(status_1.statusCode.CREATE).json(new ApiResponse_1.ApiResponse(status_1.statusCode.CREATE, createdUser, "User registered successfully"));
});
exports.loginUser = (0, AsyncHandler_1.AsyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError_1.ApiError(status_1.statusCode.BAD_REQUEST, "Email and password are required");
    }
    const result = await (0, db_1.query)("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user) {
        throw new ApiError_1.ApiError(status_1.statusCode.NOT_FOUND, "User does not exist");
    }
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError_1.ApiError(status_1.statusCode.UNAUTHORIZED, "Invalid user credentials");
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, role: user.role }, env_1.configENV.accessTokenSecret, { expiresIn: "7d" });
    const loggedInUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
    };
    return res
        .status(status_1.statusCode.READ)
        .cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
        .json(new ApiResponse_1.ApiResponse(status_1.statusCode.READ, { user: loggedInUser }, "Login successful"));
});
//# sourceMappingURL=user.controller.js.map