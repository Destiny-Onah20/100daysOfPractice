import dotenv from "dotenv";
dotenv.config();

import sequelize from "./config/config";
import app from "./app";


const port = process.env.PORT;

sequelize.authenticate().then(() => {
  console.log("Database connected");
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
  })
}).catch((err) => {
  console.log(err.message)
});