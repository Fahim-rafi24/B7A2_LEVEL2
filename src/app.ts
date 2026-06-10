import express, { Application } from "express";
import { middlewares } from "./middlewares/middlewares";


// app initialization
const app: Application = express();

// middlewares
middlewares(app);

export { app };