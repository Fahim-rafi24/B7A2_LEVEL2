"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const port = env_1.configENV.port;
db_1.db_pool.connect()
    .then(() => {
    app_1.app.listen(port, () => {
        // console.log(`⚙️ Server is running at port : ${port}`);
    });
})
    .catch((err) => {
    // console.log("PostgreSQL connection failed !!! ", err);
});
//# sourceMappingURL=server.js.map