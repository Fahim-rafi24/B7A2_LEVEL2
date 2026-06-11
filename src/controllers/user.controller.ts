import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../config/db";
import { AsyncHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { configENV } from "../config/env";
import { statusCode } from "../config/status";

export const registerUser = AsyncHandler(async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(statusCode.BAD_REQUEST, "Name, email, and password are required");
    }

    const existedUser = await query("SELECT * FROM users WHERE email = $1", [email]);
    if (existedUser.rows.length > 0) {
        throw new ApiError(statusCode.CONFLICT, "User with email already exists");
    }

    const userRole = role === "maintainer" ? "maintainer" : "contributor";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await query(
        "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at, updated_at",
        [name, email, hashedPassword, userRole]
    );

    const createdUser = result.rows[0];

    return res.status(statusCode.CREATE).json(new ApiResponse(statusCode.CREATE, createdUser, "User registered successfully"));
});

export const loginUser = AsyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(statusCode.BAD_REQUEST, "Email and password are required");
    }

    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
        throw new ApiError(statusCode.NOT_FOUND, "User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(statusCode.UNAUTHORIZED, "Invalid user credentials");
    }

    const token = jwt.sign(
        { id: user.id, name: user.name, role: user.role },
        configENV.accessTokenSecret,
        { expiresIn: "7d" }
    );

    const loggedInUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
    };

    return res
        .status(statusCode.READ)
        .cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .json(new ApiResponse(statusCode.READ, { user: loggedInUser }, "Login successful"));
});
