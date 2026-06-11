"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares/middlewares");
// app initialization
const app = (0, express_1.default)();
exports.app = app;
// middlewares
(0, middlewares_1.middlewares)(app);
// database models initialization
// modelInitiation();
// user routes
const user_routes_1 = __importDefault(require("./routes/user/user.routes"));
app.use("/api/auth", user_routes_1.default);
// issue routes
const issues_routes_1 = __importDefault(require("./routes/issues/issues.routes"));
app.use("/api/issues", issues_routes_1.default);
//# sourceMappingURL=app.js.map