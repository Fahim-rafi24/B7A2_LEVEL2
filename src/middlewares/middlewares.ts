import cors from "cors";
import cookieParser from "cookie-parser";
import { configENV } from "../config/env";
import express, { Application } from "express";



export const middlewares = (app : Application) => {
    app.use(cors({
        origin: configENV.corsOrigin,
        credentials: true,
    }));

    app.use(express.json({ limit: configENV.api_file_size }));
    app.use(express.urlencoded({ extended: true, limit: configENV.api_file_size }));
    app.use(express.static("public"));
    app.use(cookieParser());
};