import express, { Application } from "express";
import { middlewares } from "./middlewares/middlewares";

// database model import
import modelInitiation from "./db.model";


// app initialization
const app: Application = express();

// middlewares
middlewares(app);

// database models initialization
modelInitiation();

export { app };