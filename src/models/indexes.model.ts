import { db_pool } from "../config/db";
import fs from "fs";
import path from "path";


export const DBIndexes = async () => {
    try {
        const sqlPath = path.join(__dirname, "../sql/indexes.sql");
        const sqlQuery = fs.readFileSync(sqlPath, "utf8");
        await db_pool.query(sqlQuery);

        // console.log('Product Database initialized successfully');
    } catch (error) {
        console.error(error);
    }
};