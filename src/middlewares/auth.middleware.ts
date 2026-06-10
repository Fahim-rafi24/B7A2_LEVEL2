import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { configENV } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { AsyncHandler } from "../utils/AsyncHandler";
import { CustomRequest } from "../types/customRequest.type";

export const verifyJWT = AsyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;

    if (!token) {
        throw new ApiError(401, "Unauthorized request: No access token found");
    }

    try {
        const decodedToken = jwt.verify(token, configENV.accessTokenSecret) as { id: number; name: string; role: string };
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        throw new ApiError(401, "Invalid or expired access token");
    }
});

export const authorizeRole = (roles: string[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new ApiError(403, "Forbidden: Insufficient permissions");
        }
        next();
    };
};