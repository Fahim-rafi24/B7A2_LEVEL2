"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_pool = exports.query = void 0;
const pg_1 = require("pg");
const env_1 = require("./env");
// Create a new pool instance with the connection string from the environment variables
const db_pool = new pg_1.Pool({
    connectionString: env_1.configENV.db,
});
exports.db_pool = db_pool;
// Handle errors on the pool
db_pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
const query = (text, params) => db_pool.query(text, params);
exports.query = query;
//# sourceMappingURL=db.js.map