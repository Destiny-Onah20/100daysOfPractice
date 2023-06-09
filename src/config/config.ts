import { Sequelize } from "sequelize-typescript";
import User from "../models/user.model";


const sequelize = new Sequelize({
  database: "hotelbooking",
  username: "root",
  password: "123456789",
  dialect: "mysql",
  host: "127.0.0.1",
  define: {
    timestamps: true,
  },
});

export default sequelize;