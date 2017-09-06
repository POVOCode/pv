import Sequelize from "sequelize";
import ENV from "./env";

const sqdb = new Sequelize(
  ENV.PG_DB,
  ENV.PG_USER,
  ENV.PG_PASSWORD,

  {
    host: ENV.PG_HOST,
    dialect: "postgres",

    pool: {
      max: 10,
      min: 0,
      idle: 30000,
    },

    logging: false, // Logger.debug,
  }
);

export default sqdb;
