import dotenv from "dotenv";
dotenv.config();
import log from "./utils/logger";

import sequelize from "./config/config";
import app from "./app";


const port = process.env.PORT;

sequelize.authenticate().then(() => {
  log.info("Database connected");
}).then(() => {
  app.listen(port, () => {
    log.info(`Listening to port: ${port}`);
  })
}).catch((err) => {
  log.info(err.message)
});