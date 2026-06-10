import path from "path";
import fs from "fs";
import { db_pool } from "../config/db";

export const UsersModelDB = async () => {
    try {
        const sqlPath = path.join(__dirname, "../sql/users.sql");
        const sqlQuery = fs.readFileSync(sqlPath, "utf8");
        await db_pool.query(sqlQuery);
        // console.log('User Database initialized successfully');
    } catch (error) {
        console.error(error);
    }
};