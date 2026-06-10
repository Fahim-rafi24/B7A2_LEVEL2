import { db_pool } from "../config/db";
import fs from "fs";
import path from "path";


export const IssuesModelDB = async () => {
    try {
        const sqlPath = path.join(__dirname, "../sql/issues.sql");
        const sqlQuery = fs.readFileSync(sqlPath, "utf8");
        await db_pool.query(sqlQuery);

        // console.log('Product Database initialized successfully');
    } catch (error) {
        console.error(error);
    }
};