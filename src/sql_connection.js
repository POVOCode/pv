import Sequelize from "sequelize";
import Logger from "./logger";
import ENV from "./env";

const sqdb = new Sequelize(
  ENV.PG_DB,
  ENV.PG_USER,
  ENV.PG_PASSWORD,

  {
    host: ENV.PG_HOST,
    port: ENV.PG_PORT,
    dialect: "postgres",

    pool: {
      max: 10,
      min: 0,
      idle: 30000,
    },

    logging: false, // Logger.debug,
  }
);

sqdb.authenticate().then(() => {
  Logger.info(
    `Connected to ${ENV.PG_DB} pg db at ${ENV.PG_HOST}:${ENV.PG_PORT}`
  );
}).catch((err) => {
  Logger.error(
    `Failed to connect to ${ENV.PG_DB} pg db at ${ENV.PG_HOST}:${ENV.PG_PORT}`
  );

  Logger.error(err.message);
  Logger.error(err.stack);
});

export default sqdb;
