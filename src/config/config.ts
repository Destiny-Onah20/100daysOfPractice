import { Sequelize } from "sequelize";


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