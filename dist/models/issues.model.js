"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssuesModelDB = void 0;
const db_1 = require("../config/db");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const IssuesModelDB = async () => {
    try {
        const sqlPath = path_1.default.join(__dirname, "../sql/issues.sql");
        const sqlQuery = fs_1.default.readFileSync(sqlPath, "utf8");
        await db_1.db_pool.query(sqlQuery);
        // console.log('Product Database initialized successfully');
    }
    catch (error) {
        console.error(error);
    }
};
exports.IssuesModelDB = IssuesModelDB;
//# sourceMappingURL=issues.model.js.map