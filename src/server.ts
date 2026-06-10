import { app } from "./app";
import { db_pool } from "./config/db";
import { configENV } from "./config/env";


const port = configENV.port;


db_pool.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙️ Server is running at port : ${port}`);
    });
  })
  .catch((err) => {
    // console.log("PostgreSQL connection failed !!! ", err);
  });