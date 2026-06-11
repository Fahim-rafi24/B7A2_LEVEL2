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

// user routes
import userRouter from "./routes/user/user.routes";
app.use("/api/auth", userRouter);

// issue routes
import issueRouter from "./routes/issues/issues.routes";
app.use("/api/issues", issueRouter);

export { app };