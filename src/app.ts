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

// routes declaration
import userRouter from "./routes/user/user.routes";
app.use("/api/auth", userRouter);

export { app };