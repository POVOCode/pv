const Sequelize = require("sequelize");
const Logger = require("./logger");

module.exports = new Sequelize(
  process.env.PG_DB,
  process.env.PG_USER,
  process.env.PG_PASSWORD,

  {
    host: process.env.PG_HOST,
    dialect: "postgres",

    pool: {
      max: 10,
      min: 0,
      idle: 30000,
    },

    logging: false, // Logger.debug,
  }
);
