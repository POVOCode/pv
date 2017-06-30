const SQDB = require("../lib/sql_connection");
const DataTypes = require("sequelize/lib/data-types");

const Reward = SQDB.define("Reward", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },

  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: SQDB.literal("NOW()"),
  },

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: SQDB.literal("NOW()"),
    allowNull: false,
  },
});

module.exports = Reward;
