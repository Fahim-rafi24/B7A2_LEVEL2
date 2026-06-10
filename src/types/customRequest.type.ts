import { Request } from "express";

export interface CustomRequest extends Request {
    user?: { id: number; name: string; role: string };
}